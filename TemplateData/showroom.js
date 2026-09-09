// Arranque del visor WebGL del Showroom VR (UNAD).
// Script externo para que la política CSP de la página pueda prohibir scripts en línea.
(function () {
  "use strict";

  var canvas = document.querySelector("#unity-canvas");
  var loading = document.querySelector("#unity-loading");
  var barFull = document.querySelector("#unity-bar-full");
  var progressText = document.querySelector("#unity-progress-text");
  var fullscreenButton = document.querySelector("#unity-fullscreen");
  var warningBanner = document.querySelector("#unity-warning");

  function showBanner(msg, type) {
    function updateVisibility() {
      warningBanner.style.display = warningBanner.children.length ? "block" : "none";
    }
    var div = document.createElement("div");
    div.textContent = msg;
    div.className = type === "error" ? "error" : "warning";
    warningBanner.appendChild(div);
    if (type !== "error") {
      setTimeout(function () { warningBanner.removeChild(div); updateVisibility(); }, 5000);
    }
    updateVisibility();
  }

  function isCoarsePointer() {
    try { return window.matchMedia && window.matchMedia("(pointer: coarse)").matches; } catch (e) { return false; }
  }

  // En pantallas táctiles, evita que el navegador interprete los dedos como gestos propios
  // (zoom con dos dedos, desplazamiento, menú contextual) y se los quite al visor.
  ["touchstart", "touchmove", "touchend", "touchcancel"].forEach(function (type) {
    canvas.addEventListener(type, function (e) { if (e.cancelable) e.preventDefault(); }, { passive: false });
  });
  document.addEventListener("gesturestart", function (e) { e.preventDefault(); }, { passive: false });
  canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });

  var d = canvas.dataset;
  var config = {
    dataUrl: d.data,
    frameworkUrl: d.framework,
    codeUrl: d.code,
    streamingAssetsUrl: "StreamingAssets",
    companyName: d.company,
    productName: d.product,
    productVersion: d.version,
    showBanner: showBanner,
    // Limita la resolución interna en pantallas de alta densidad para cuidar el rendimiento
    // (en pantallas táctiles, celulares y tabletas, se usa resolución nativa 1:1).
    devicePixelRatio: Math.min(window.devicePixelRatio || 1, isCoarsePointer() ? 1.0 : 1.5)
  };
  if (d.memory) config.memoryUrl = d.memory;
  if (d.symbols) config.symbolsUrl = d.symbols;

  var script = document.createElement("script");
  script.src = d.loader;
  script.onload = function () {
    createUnityInstance(canvas, config, function (progress) {
      barFull.style.width = (100 * progress) + "%";
      progressText.textContent = "Cargando el recurso… " + Math.round(100 * progress) + " %";
    }).then(function (unityInstance) {
      window.unityInstance = unityInstance;
      loading.style.display = "none";
      fullscreenButton.style.display = "block";
      fullscreenButton.onclick = function () { unityInstance.SetFullscreen(1); };
      canvas.focus();
    }).catch(function (message) {
      progressText.textContent = "No fue posible iniciar el recurso: " + message;
      progressText.style.color = "#ffb3b3";
    });
  };
  script.onerror = function () {
    progressText.textContent = "No fue posible descargar el cargador del recurso. Verifique su conexión.";
    progressText.style.color = "#ffb3b3";
  };
  document.body.appendChild(script);
})();
