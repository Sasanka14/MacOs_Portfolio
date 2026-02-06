import { useState, useMemo, useCallback } from 'react';
import { dockApps, navLinks, locations } from '#shared/constants';

const useSearch = () => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Helper: Recursively build folder/file index with paths
  const buildFileIndex = useCallback(() => {
    const index = [];

    Object.entries(locations).forEach(([locationType, location]) => {
      const traverseFolder = (folder, parentPath = '', parentFolders = []) => {
        const currentPath = parentPath 
          ? `${parentPath} / ${folder.name}` 
          : folder.name;
        
        const folderHierarchy = [...parentFolders, folder];

        // Add the folder itself
        index.push({
          id: `folder-${folder.type || locationType}-${folder.id}`,
          type: 'folder',
          label: folder.name,
          description: currentPath,
          path: currentPath,
          folderType: folder.type || locationType,
          folderId: folder.id,
          icon: folder.icon || '/icons/folder.svg',
          folderObject: folder, // Full folder object for nested navigation
          folderHierarchy: folderHierarchy, // Array of all parent folders
          isRootFolder: parentFolders.length === 0, // Is this a top-level folder
          parentFolders: parentFolders, // Parent folder chain for navigation
        });

        // Add children (files and subfolders)
        if (folder.children && Array.isArray(folder.children)) {
          folder.children.forEach((child) => {
            if (child.kind === 'folder') {
              traverseFolder(child, currentPath, folderHierarchy);
            } else if (child.kind === 'file') {
              index.push({
                id: `file-${child.id}`,
                type: 'file',
                label: child.name,
                description: `in ${currentPath}`,
                path: `${currentPath} / ${child.name}`,
                fileType: child.fileType,
                folderPath: currentPath,
                folderType: folder.type || locationType,
                icon: child.icon || '/icons/file.svg',
                file: child,
                parentFolder: folder, // Direct parent folder
                parentFolders: folderHierarchy, // All ancestor folders
                folderHierarchy: folderHierarchy, // Same hierarchy as files are in this folder
              });
            }
          });
        }
      };

      traverseFolder(location);
    });

    return index;
  }, []);

  const fileIndex = useMemo(() => buildFileIndex(), [buildFileIndex]);

  // Build complete search index
  const searchIndex = useMemo(() => {
    const index = [];

    // Add apps from dock
    dockApps.forEach((app) => {
      index.push({
        id: `app-${app.id}`,
        type: 'app',
        label: app.name,
        description: `Open ${app.name}`,
        appId: app.id,
        icon: app.icon,
      });
    });

    // Add navigation links
    navLinks.forEach((link) => {
      index.push({
        id: `nav-${link.id}`,
        type: 'nav',
        label: link.name,
        description: `Go to ${link.name}`,
        navType: link.type,
        href: link.href,
      });
    });

    // Add commands
    const commands = [
      {
        id: 'cmd-light',
        type: 'command',
        label: 'Light Mode',
        description: 'Switch to light theme',
        action: 'setTheme',
        theme: 'light',
      },
      {
        id: 'cmd-dark',
        type: 'command',
        label: 'Dark Mode',
        description: 'Switch to dark theme',
        action: 'setTheme',
        theme: 'dark',
      },
      {
        id: 'cmd-system',
        type: 'command',
        label: 'System Theme',
        description: 'Follow OS preferences',
        action: 'setTheme',
        theme: 'system',
      },
    ];
    index.push(...commands);

    // Add all folders and files
    index.push(...fileIndex);

    return index;
  }, [fileIndex]);

  // Parse query for scope commands
  const parseQuery = useCallback((q) => {
    const trimmed = q.trim();
    
    // Match: open <folder>
    const openMatch = trimmed.match(/^open\s+(.+)$/i);
    if (openMatch) {
      return {
        command: 'open',
        folderQuery: openMatch[1].trim(),
        originalQuery: trimmed,
      };
    }

    // Match: find <query> in <folder>
    const findMatch = trimmed.match(/^find\s+(.+?)\s+in\s+(.+)$/i);
    if (findMatch) {
      return {
        command: 'find',
        searchQuery: findMatch[1].trim(),
        folderQuery: findMatch[2].trim(),
        originalQuery: trimmed,
      };
    }

    // Match: search <query> in <folder>
    const searchMatch = trimmed.match(/^search\s+(.+?)\s+in\s+(.+)$/i);
    if (searchMatch) {
      return {
        command: 'search',
        searchQuery: searchMatch[1].trim(),
        folderQuery: searchMatch[2].trim(),
        originalQuery: trimmed,
      };
    }

    return {
      command: null,
      originalQuery: trimmed,
    };
  }, []);

  // Search and filter with scope support
  const { results, activeScope } = useMemo(() => {
    if (!query.trim()) return { results: searchIndex, activeScope: null };

    const parsed = parseQuery(query);
    let scopedResults = [];
    let activeScopeLabel = null;

    if (parsed.command === 'open') {
      // find <folder> command
      const folderQuery = parsed.folderQuery.toLowerCase();
      const folderMatches = fileIndex.filter(
        (item) => item.type === 'folder' && 
          item.label.toLowerCase().includes(folderQuery)
      );
      scopedResults = folderMatches;
      activeScopeLabel = `Opening: ${parsed.folderQuery}`;
    } else if (parsed.command === 'find' || parsed.command === 'search') {
      // find/search <query> in <folder>
      const folderQuery = parsed.folderQuery.toLowerCase();
      const searchQuery = parsed.searchQuery.toLowerCase();

      // Find the folder first (exact match first, then partial)
      let targetFolder = fileIndex.find(
        (item) => 
          item.type === 'folder' &&
          item.label.toLowerCase() === folderQuery
      );

      // If no exact match, try partial match
      if (!targetFolder) {
        targetFolder = fileIndex.find(
          (item) => 
            item.type === 'folder' &&
            item.label.toLowerCase().includes(folderQuery)
        );
      }

      if (targetFolder) {
        activeScopeLabel = `Searching in: ${targetFolder.label}`;
        const folderPath = targetFolder.path;

        scopedResults = searchIndex.filter((item) => {
          // Only items within this folder
          if (item.type === 'folder') {
            return (
              item.path.startsWith(folderPath) &&
              item.label.toLowerCase().includes(searchQuery) &&
              item.path !== folderPath // Exclude the folder itself
            );
          } else if (item.type === 'file') {
            return (
              item.folderPath === folderPath &&
              item.label.toLowerCase().includes(searchQuery)
            );
          }
          return false;
        });

        // Sort: exact folder matches first, then subfolders, then files
        scopedResults.sort((a, b) => {
          const aScore = 
            a.label.toLowerCase() === searchQuery ? 0 :
            a.type === 'folder' ? 1 : 2;
          const bScore = 
            b.label.toLowerCase() === searchQuery ? 0 :
            b.type === 'folder' ? 1 : 2;
          return aScore - bScore;
        });
      } else {
        scopedResults = [];
        activeScopeLabel = `No folder found: ${parsed.folderQuery}`;
      }
    } else {
      // Global search
      const q = parsed.originalQuery.toLowerCase();

      // Filter globally
      const filtered = searchIndex.filter((item) => {
        const matchLabel = item.label.toLowerCase().includes(q);
        const matchPath = item.path ? item.path.toLowerCase().includes(q) : false;
        const matchDesc = item.description.toLowerCase().includes(q);
        return matchLabel || matchPath || matchDesc;
      });

      // Sort results: exact matches first, then folders, then files, then apps
      filtered.sort((a, b) => {
        const aScore = 
          a.label.toLowerCase() === q ? 0 :
          a.type === 'folder' ? 1 :
          a.type === 'file' ? 2 :
          a.type === 'app' ? 3 : 4;
        const bScore = 
          b.label.toLowerCase() === q ? 0 :
          b.type === 'folder' ? 1 :
          b.type === 'file' ? 2 :
          b.type === 'app' ? 3 : 4;
        return aScore - bScore;
      });

      scopedResults = [...scopedResults, ...filtered];
    }

    return {
      results: scopedResults.length > 0 ? scopedResults : [],
      activeScope: activeScopeLabel,
    };
  }, [query, searchIndex, fileIndex, parseQuery]);

  // Reset selected index when query changes
  const handleQueryChange = useCallback((newQuery) => {
    setQuery(newQuery);
    setSelectedIndex(0);
  }, []);

  // Navigation handlers
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev < results.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  }, [results.length]);

  return {
    query,
    setQuery: handleQueryChange,
    results,
    selectedIndex,
    setSelectedIndex,
    handleKeyDown,
    activeScope,
  };
};

export default useSearch;
