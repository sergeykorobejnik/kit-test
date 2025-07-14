interface ContentTransformerOptions {
  maxLength: number;
}

export function postContentFormater(content: string, opts: ContentTransformerOptions) {
  return content.length > opts.maxLength ? content.slice(0, opts.maxLength) + '...' : content;
}
