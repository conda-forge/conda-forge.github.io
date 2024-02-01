/* 

See: https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#ex-config

*/
export function reverseSidebarItems(items) {

    // Reverse child items of categories
    const result = items.map((item) => {
      if (item.type === 'category') {
        return {...item, items: reverseSidebarItems(item.items)};
      }

      if (item['id'].startsWith('meeting-minutes/')) {
          // Add a normalized label (YYYY-MM-DD) for each file
          item['label'] = item['id'].replace('meeting-minutes/', '');
        }
        return item;
    });
  
    // Reverse items at current level
    result.reverse();
  
    return result;
}
