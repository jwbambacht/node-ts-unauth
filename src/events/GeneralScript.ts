function onGenericPageLoad(): void {
    jQuery(($) => {

        $('[data-bs-toggle="tooltip"]').tooltip({
            html: true
        });
    });
}

document.addEventListener("DOMContentLoaded", onGenericPageLoad);