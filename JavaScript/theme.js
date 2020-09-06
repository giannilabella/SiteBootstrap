(() => {
    let linkTheme = document.getElementById('theme-css');
    let theme = localStorage.theme || "light";

    linkTheme.setAttribute('href', `Styles/${theme}-theme.css`);

    let chkBox = document.getElementById('check');

    if(theme === "dark"){
        chkBox.checked = true;
    }
})();

function themeUpdate(){
    theme = localStorage.theme || "light";
    
    if(theme === "light"){
        localStorage.setItem('theme', 'dark');
    }else{
        localStorage.setItem('theme', 'light');
    }
    
    let linkTheme = document.getElementById('theme-css');
    theme = localStorage.theme;

    linkTheme.setAttribute('href', `Styles/${theme}-theme.css`)
}