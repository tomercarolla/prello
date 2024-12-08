import { Editor } from '@tinymce/tinymce-react';
import { Button, Icon } from '@ui';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import { updateTask } from '../../../store/board/board.actions.js';

export function TaskDescription({ board, groupId, task }) {
  const [description, setDescription] = useState(task.description || '');
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const editorRef = useRef(null);

  async function handleDescriptionUpdate() {
    if (editorRef.current) {
      const updatedDescription = editorRef.current.currentContent.replace(
        /<\/?p>/g,
        '',
      );

      try {
        await updateTask(
          board._id,
          groupId,
          { ...task, description: updatedDescription },
          'Updated task description',
        );

        setDescription(updatedDescription);
      } catch (error) {
        console.error('Failed to update task:', error);
      }
    }

    setShowDescriptionInput(false);
  }

  return (
    <div className="description-container">
      <div className="action-title">
        <Icon name="description" size="22px" />

        <h4>Description</h4>
      </div>

      {showDescriptionInput ? (
        <>
          <Editor
            apiKey="ff5o8kn9j9f3rd2sl431p5mxl6oqpa5hf447rggzzcufpfuu"
            init={{
              selector: 'textarea',
              plugins: [
                'anchor',
                'autolink',
                'charmap',
                'codesample',
                'emoticons',
                'image',
                'link',
                'lists',
                'media',
                'searchreplace',
                'table',
                'visualblocks',
                'wordcount',
                'checklist',
                'mediaembed',
                'casechange',
                'export',
                'formatpainter',
                'pageembed',
                'a11ychecker',
                'tinymcespellchecker',
                'permanentpen',
                'powerpaste',
                'advtable',
                'advcode',
                'editimage',
                'advtemplate',
                'ai',
                'mentions',
                'tinycomments',
                'tableofcontents',
                'footnotes',
                'mergetags',
                'autocorrect',
                'typography',
                'inlinecss',
                'markdown',
                'importword',
                'exportword',
                'exportpdf',
              ],
              menubar: false,
              resize: false,
              height: 300,
              toolbar:
                'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              tinycomments_mode: 'embedded',
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject('See docs to implement AI Assistant'),
                ),
              content_style:
                'body { color: #B6C2CF; font-size: 14px; font-family: Arial; }',
            }}
            value={description}
            onEditorChange={(content) =>
              setDescription(content.replace(/<\/?p>/g, ''))
            }
            ref={editorRef}
          />

          <Flex>
            <Button
              scale="brand"
              radius="3px"
              onClick={handleDescriptionUpdate}
            >
              Save
            </Button>

            <Button
              scale="ghost"
              radius="3px"
              onClick={() => setShowDescriptionInput(false)}
            >
              Cancel
            </Button>
          </Flex>
        </>
      ) : (
        <Button
          scale="neutral"
          fullwidth="true"
          className="btn-description"
          onClick={() => setShowDescriptionInput(true)}
        >
          {description || 'Add more detailed description...'}
        </Button>
      )}
    </div>
  );
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-block-start: 8px;
`;
