import Article from "@/components/_common_/Article";

export default function ArticleEditorRoot({ article, suggestions }) {
  return (
    <div className='grid grid-cols-2'>
      <div>Editor</div>
      <div className='bg-neutral-900'>
        <Article
          article={article}
          suggestions={suggestions}
        />
      </div>
    </div>
  )
}