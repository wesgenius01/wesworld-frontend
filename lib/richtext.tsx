import React from 'react'

// Lexical stores formatting as a bitmask on each text node.
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_STRIKETHROUGH = 4
const FORMAT_UNDERLINE = 8

function renderText(node: any, key: number) {
  let el: React.ReactNode = node.text
  if (node.format & FORMAT_BOLD) el = <strong key={key}>{el}</strong>
  if (node.format & FORMAT_ITALIC) el = <em key={key}>{el}</em>
  if (node.format & FORMAT_UNDERLINE) el = <u key={key}>{el}</u>
  if (node.format & FORMAT_STRIKETHROUGH) el = <s key={key}>{el}</s>
  return <React.Fragment key={key}>{el}</React.Fragment>
}

function renderNode(node: any, key: number): React.ReactNode {
  if (!node) return null

  switch (node.type) {
    case 'text':
      return renderText(node, key)

    case 'paragraph':
      return <p key={key}>{node.children?.map(renderNode)}</p>

    case 'heading': {
      const Tag = node.tag as keyof JSX.IntrinsicElements
      return <Tag key={key}>{node.children?.map(renderNode)}</Tag>
    }

    case 'list':
      return node.listType === 'number' ? (
        <ol key={key}>{node.children?.map(renderNode)}</ol>
      ) : (
        <ul key={key}>{node.children?.map(renderNode)}</ul>
      )

    case 'listitem':
      return <li key={key}>{node.children?.map(renderNode)}</li>

    case 'quote':
      return <blockquote key={key}>{node.children?.map(renderNode)}</blockquote>

    case 'link':
      return (
        <a key={key} href={node.fields?.url || '#'}>
          {node.children?.map(renderNode)}
        </a>
      )

    default:
      return node.children ? (
        <React.Fragment key={key}>{node.children.map(renderNode)}</React.Fragment>
      ) : null
  }
}

export function RichText({ content }: { content: any }) {
  if (!content?.root?.children) return null
  return <>{content.root.children.map((node: any, i: number) => renderNode(node, i))}</>
}
