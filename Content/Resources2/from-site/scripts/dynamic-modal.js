document.addEventListener("DOMContentLoaded", function () {
  function showModal(
    {
      title = "",
      message = "",
      confirmText = "OK",
      cancelText = "Cancel",
      onConfirm  = () => {},
      onCancel = () => {},
      hideCancelButton = false,
      hideConfirmButton = false
    }) {
    const modalHtml = `<div class="modal normal-size unpadded">
                          <div class="modal-title separator">
                            ${title}
                            <button class="btn fa fa-times"></button>
                          </div> 
                          <div class="modal-message">${message}</div>
                          <div class="modal-buttons">
                             <button class="btn modal-confirm ${hideConfirmButton ? "hidden" : ""}">${confirmText}</button>
                             <button class="btn modal-cancel ${hideCancelButton ? "hidden" : ""}">${cancelText}</button>
                          </div>
                       </div>`;

    let modal = document.createElement("div");
    modal.classList.add("modal-container");
    modal.classList.add("in");
    modal.innerHTML = modalHtml;

    modal.getElementsByClassName("modal-confirm")[0].onclick = () => {
      onConfirm();
      document.body.removeChild(modal);
    };

    const onKeyUp = (e) => {
      if (e.keyCode === 27) {
        _onCancel();
      }
    };

    const _onCancel = () => {
      onCancel();
      window.removeEventListener("keyup", onKeyUp);
      document.body.removeChild(modal);
    };

    modal.getElementsByClassName("modal-cancel")[0].onclick = _onCancel;
    modal.getElementsByClassName("fa-times")[0].onclick = _onCancel;
    modal.onclick = _onCancel;
    modal.getElementsByClassName("modal")[0].onclick = e => e.stopPropagation();

    window.addEventListener("keyup", onKeyUp);

    document.body.appendChild(modal);
  }

  window.ApplitoolsModal = {
    show: showModal
  }
});