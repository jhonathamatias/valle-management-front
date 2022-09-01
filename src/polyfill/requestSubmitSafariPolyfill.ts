export default function requestSubmitSafariPolyfill(prototype: HTMLFormElement) {
  if (typeof prototype.requestSubmit == "function") return;

  prototype.requestSubmit = function(submitter: HTMLInputElement) {
    if (submitter) {
      validateSubmitter(submitter, this);
      submitter.click();
    } else {
      submitter = document.createElement("input");
      submitter.type = "submit";
      submitter.hidden = true;
      this.appendChild(submitter);
      submitter.click();
      this.removeChild(submitter);
    }
  }

  function validateSubmitter(submitter: HTMLInputElement, form: HTMLFormElement) {
    submitter instanceof HTMLElement || raise(TypeError, "parameter 1 is not of type 'HTMLElement'")
    submitter.type == "submit" || raise(TypeError, "The specified element is not a submit button")
    submitter.form == form || raise(TypeError, "The specified element is not owned by this form element", "NotFoundError")
  }

  function raise(errorConstructor: TypeErrorConstructor, message: string, name: string = '') {
      throw new errorConstructor("Failed to execute 'requestSubmit' on 'HTMLFormElement': " + message + ". " + name);
  }
};
