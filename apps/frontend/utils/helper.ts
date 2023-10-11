export function getTitleFromContent(currentContent: string) {
  const content = currentContent.substring(0, 200);
  let i;
  let pos;
  let title = '';

  for (i = 0; i < content.length; i += 1) {
    if (
      content[i] !== ' ' &&
      content[i] !== '\n' &&
      content[i] !== '\t' &&
      content[i] !== '\r' &&
      content[i] !== '\v' &&
      content[i] !== '\f'
    ) {
      // found the first non-whitespace char
      pos = content.indexOf('\n', i + 1); // next new line char

      if (pos === -1) {
        // If no newline found, consider the remaining content as the title
        title += content.substring(i);
      } else {
        // Extract the title from the beginning of the content up to the newline
        title += content.substring(i, pos);
      }

      break;
    }
  }

  if (title.length === 0) return 'Empty Tab';

  if (title.length > 20) title = `${title.substring(0, 18)}...`;

  return title;
}
