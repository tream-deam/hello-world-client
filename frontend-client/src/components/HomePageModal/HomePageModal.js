import './HomePageModal.scss';
import { useName, useNameUpdate } from '../../providers/UsernameProvider';
import { Dropdown } from '../LanguageDropDown/Dropdown';
import { useLanguageUpdate } from '../../providers/LanguageContext';

const HomePageModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const name = useName();
  const setName = useNameUpdate();
  const setLanguage = useLanguageUpdate();
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
                     value={name} 
                    onChange={(event) => setName(event.target.value)} 
                    data-testid="username-input"
                  />
                </form>
              <p>Language you speak:</p>
                <form  onSubmit={(e) => e.preventDefault()} onChange={e => setLanguage(e.target.value)}>
                <Dropdown/>
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