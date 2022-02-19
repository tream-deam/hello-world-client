import './HomePageModal.scss';

const HomePageModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <div className="modal-header">
          <div className="close-button" onClick={handleClose}>
            x
          </div>
        </div>
        <p>Please add your name so your doctor knows you are here.</p>
                <form autoComplete="off"  onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="modal-input"
                    name="name"
                    type="text"
                    placeholder="Your name"
              /*       value={student} 
                    onChange={(event) => setStudent(event.target.value)} */
                    data-testid="username-input"
                  />
                </form>
              <p>Language you speak:</p>
                <form autoComplete="off"  onSubmit={(e) => e.preventDefault()}>
                    <input
                      className="modal-input"
                      name="language"
                      type="text"
                      placeholder="Language you speak"
                /*       value={student} 
                      onChange={(event) => setStudent(event.target.value)} */
                      data-testid="language-input"
                    />
                {/*     <DropDown/> */}
                  </form>
                  <br></br>
       <footer className="modal-footer">
          <button className="modal-submit" type="button" onClick={handleClose}>
            Submit
          </button>
        </footer>
      </section>
    </div>
  );
};

export default HomePageModal