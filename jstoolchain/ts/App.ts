import EditProfileModal from "./EditProfileModal";
import Like from "./Like";
import Profile from "./Profile";

class App {
    xcsrfToken: string
    readonly view = document.getElementsByTagName('body')[0].dataset.view

    constructor(xcsrfToken: string) {
        this.xcsrfToken = xcsrfToken;
    }

    run() {
        this.textarea();
        const likeButtons = Array.from(document.querySelectorAll('[data-button="like"]')) as HTMLElement[];
        new Like(likeButtons, this.xcsrfToken);
        this.loadClasses();
        console.log('App running...');
    }

    private textarea() {
        // Resize textarea on input dynamically
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
            tx[i].setAttribute(
                "style",
                "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
            );
            tx[i].addEventListener("input", OnInput, false);
        }

        function OnInput() {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        }
    }

    private loadClasses() {
        if (this.view === 'profile') {
            Profile.run();
            EditProfileModal.run();
        }
    }
}

const csrfmiddlewaretokenInputs = document.getElementsByName('csrfmiddlewaretoken') as NodeListOf<HTMLInputElement>;
const xcsrfToken: string = csrfmiddlewaretokenInputs[0].value
new App(xcsrfToken).run();