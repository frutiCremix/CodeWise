const $html=document.getElementById('html');
const $css=document.getElementById('css');
const $js=document.getElementById('js');
const frame=document.getElementById('frame');

$html.addEventListener("input",update);
$css.addEventListener("input",update);
//$js.addEventListener("keydown",(e)=>{if(e.keyCode=='69'){update()}});

function init(){
    const pathname=window.location.href;
 
    const [rawHtml,rawCss,rawJs]=pathname.slice(23).split('|');
    //console.log({rawHtml,rawCss,rawJs})

    const html=window.atob(rawHtml);
    const css=window.atob(rawCss);
    const js=window.atob(rawJs);
    //console.log({html,css,js})

    $html.innerText=html;
    $css.innerText=css;
    $js.innerText=js;
    const htmlForPreview=crearHtml({html,css,js});
    
    frame.setAttribute('srcdoc',htmlForPreview);
}

function update(){
    const html=$html.value;
    const css=$css.value;
    const js=$js.value;
   //console.log({html,css,js})
    const hashed=`${window.btoa(html)}|${window.btoa(css)}|${window.btoa(js)}`;
    //console.log(hashed)
    window.history.replaceState(null,null,`/?${hashed}`);

    const htmlForPreview=crearHtml({html,css,js});
   
    frame.setAttribute('srcdoc',htmlForPreview);
}

function crearHtml({html,css,js}){


    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <style>
                ${css}
            </style>
        </head>
        <body>
            ${html}
        <script>
            ${js}
        </script>
        </body>
    </html>
    `
}
init();