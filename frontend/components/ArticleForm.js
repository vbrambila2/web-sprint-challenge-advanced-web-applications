import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const [disabled, setDisabled] = useState(true)
  // ✨ where are my props? Destructure them here
  const { 
    currentArticle, 
    onSubmit,
    postArticle,
    updateArticle,
    setCurrentArticleId
  } = props

  useEffect(() => {
    // ✨ implement
    // Every time the `currentArticle` prop changes, we should check it for truthiness:
    // if it's truthy, we should set its title, text and topic into the corresponding
    // values of the form. If it's not, we should reset the form back to initial values.
    setValues(currentArticle ? currentArticle : initialFormValues)
  }, [currentArticle])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })

    const title_input = document.getElementById("title");
    const newTitle = title_input.value
    const text_input = document.getElementById("text");
    const newText = text_input.value
    const topic_input = document.getElementById("topic");
    const newTopic = topic_input.value

    if (newTopic.trim().length === 0) {
      setDisabled(true) 
    } else if (newText.trim().length === 0) {
      setDisabled(true) 
    } else if (newTitle.trim().length === 0) {
      setDisabled(true) 
    } else {
      setDisabled(false)
    }
  }

  const submit = evt => {
    evt.preventDefault()
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    onSubmit(values)
    setValues(initialFormValues)
  }
  
  const cancelEdit = () => {
    onSubmit(values)
    //setValues(initialFormValues)
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={submit}>
      <h2>Create Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        {
          currentArticle 
          ?  <div>
              <button disabled={disabled} id="submitArticle">Submit</button>
              <button onClick={cancelEdit}>Cancel edit</button>
             </div>
          :  <button disabled={disabled} id="submitArticle">Submit</button>
        }
        
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
