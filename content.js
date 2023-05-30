document.addEventListener("DOMContentLoaded", () => {
    let cssRule = `.custom-cursor { cursor: url(${chrome.storage.local.get("src")}), auto; }`;
    console.log(cssRule)
      // Create a <style> element
      let style = document.createElement('style');
      style = 'text/css';

      // Append the CSS rule to the <style> element
      style.appendChild(document.createTextNode(cssRule));

      // Append the <style> element to the <head> of the document
      document.head.appendChild(style);
      document.documentElement.classList.add('custom-cursor');
})