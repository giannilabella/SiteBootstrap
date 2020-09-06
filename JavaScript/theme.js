function themeUpdate(pasta = 0){
    theme = localStorage.theme || "light";
    
    if(theme === "light"){
        localStorage.setItem('theme', 'dark');
    }else{
        localStorage.setItem('theme', 'light');
    }
    
    let linkTheme = document.getElementById('theme-css');
    theme = localStorage.theme;

    pasta = pasta === 0 ? './': '../';

    linkTheme.setAttribute('href', `${pasta}Styles/${theme}-theme.css`)
}