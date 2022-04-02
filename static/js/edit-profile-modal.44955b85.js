var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var parcelRequire = $parcel$global["parcelRequire938a"];
parcelRequire.register("haw7a", function(module, exports) {
const $c7fc48236b5c00cc$var$close = document.getElementById('close');
const $c7fc48236b5c00cc$var$modalContent = document.getElementById('modal-content');
const $c7fc48236b5c00cc$var$editProfileModal = document.getElementById('edit-profile-modal');
$c7fc48236b5c00cc$var$close.onclick = ()=>{
    $c7fc48236b5c00cc$var$editProfileModal.classList.remove('flex');
    $c7fc48236b5c00cc$var$editProfileModal.classList.add('hidden');
};
const $c7fc48236b5c00cc$var$modalContentChildren = $c7fc48236b5c00cc$var$modalContent.querySelectorAll('*');
const $c7fc48236b5c00cc$var$modalContentChildrenArray = Array.from($c7fc48236b5c00cc$var$modalContentChildren);
// Close modal if anywhere is clicked outside the modal content
document.getElementById('edit-profile-modal').onclick = (e)=>{
    if (e.target != $c7fc48236b5c00cc$var$modalContent && !$c7fc48236b5c00cc$var$modalContentChildrenArray.includes(e.target)) {
        $c7fc48236b5c00cc$var$editProfileModal.classList.remove('flex');
        $c7fc48236b5c00cc$var$editProfileModal.classList.add('hidden');
    }
};
const $c7fc48236b5c00cc$var$saveButton = document.getElementById('save');
const $c7fc48236b5c00cc$var$profileForm = document.getElementById('profile-form');
save.onclick = ()=>{
    $c7fc48236b5c00cc$var$profileForm.submit();
};
// Count input value length and update counter
function $c7fc48236b5c00cc$var$inputCounter(input, inputCount) {
    input.oninput = function() {
        inputCount.innerText = this.value.length;
    };
}
// Get all input fields
const $c7fc48236b5c00cc$var$inputElements = document.querySelectorAll('[id$="input"]');
const $c7fc48236b5c00cc$var$inputElementsArray = Array.from($c7fc48236b5c00cc$var$inputElements);
$c7fc48236b5c00cc$var$inputElementsArray.forEach((element)=>{
    let id = element.id;
    let inputCount = document.getElementById(id + '-count');
    inputCount.innerText = element.value.length;
    $c7fc48236b5c00cc$var$inputCounter(element, inputCount);
});

});


//# sourceMappingURL=edit-profile-modal.44955b85.js.map
