import { Button, Icon } from "@ui";

export function NavTaskDetails() {
  return (
    <nav className="nav-task-body">
      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="join" size="18px" />
          Join
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="member" size="18px" />
          Members
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="label" size="18px" />
          Labels
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="checklist" size="18px" />
          Checklist
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="date" size="18px" />
          Dates
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="attachment" size="18px" />
          Attachments
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="cover" size="18px" />
          Cover
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="customFields" size="18px" />
          CustomFields
        </Button>
      </div>

      <span>Actions</span>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="move" size="18px" />
          Move
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="copy" size="18px" />
          Copy
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="template" size="18px" />
          Make template
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="archive" size="18px" />
          Archive
        </Button>
      </div>

      <div className="btn-container">
        <Button scale="neutral" className="btn-nav">
          <Icon name="share" size="18px" />
          Share
        </Button>
      </div>
    </nav>
  );
}