import React, { useState } from "react";
import { TEXTBOX } from "./config";
import { Link } from "react-router-dom";
import { dateString } from "../../util/util";
import TextBoxForm from "../../components/textbox";
import { Row } from "../../components/layout";
import { instance, COMMENT } from "../../config/api";

const Comment = (props) => {
  const [showEditBox, setShowEditBox] = useState(false);
  const [text, setText] = useState(props.text);
  const [updatedAt, setupdatedAt] = useState(props.updatedAt);
  const [username, setUsername] = useState(props.username);
  const [edited, setEdited] = useState(props.edited);

  const handleShowEdit = () => {
    setShowEditBox(!showEditBox);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.length <= 0) return;

    setShowEditBox(false);

    let data = {
      project_id: props.project_id,
      comment: {
        id: props.id,
        text: text,
      },
    };

    instance
      .patch(COMMENT, data)
      .then((res) => {
        setupdatedAt(res.data.updatedAt);
        setUsername(res.data.username);
        setEdited(res.data.edited);
        setText(res.data.text);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="project-comment">
      <h5>
        <Link to={`/profile/${username}`}>{username}</Link>
      </h5>
      <p className="small grey-text">{dateString(props.createdAt)}</p>
      <p>{text}</p>
      {edited && (
        <p className="italic small grey-text">
          edited: {dateString(updatedAt)}
        </p>
      )}
      {props.canEdit && (
        <span className="italic row space-between">
          <p className="link" onClick={handleShowEdit}>
            {showEditBox ? "cancel" : "edit"}
          </p>
          <Row>
            <p
              className="project-delete"
              onClick={props.onDelete}
              id={JSON.stringify({ id: props.id, index: props.index })}
            >
              delete
            </p>
          </Row>
        </span>
      )}
      {showEditBox && (
        <TextBoxForm
          onSubmit={handleSubmit}
          maxLength={TEXTBOX.maxLength}
          value={text}
          onChange={handleChange}
          rows={TEXTBOX.rows}
          cols={TEXTBOX.cols}
        />
      )}
    </div>
  );
};

export default Comment;
