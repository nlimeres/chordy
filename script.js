const diccionarioMusical = {
    "C":  { m3: "E♭", M3: "E",  d5: "G♭", p5: "G",  a5: "G♯", d7: "B𝄫", m7: "B♭", M7: "B" },
    "C#": { m3: "E",  M3: "E♯", d5: "G",  p5: "G♯", a5: "G𝄪", d7: "B♭",  m7: "B",  M7: "B♯" },
    "Db": { m3: "F♭", M3: "F",  d5: "A𝄫", p5: "A♭", a5: "A",  d7: "C𝄫", m7: "C♭", M7: "C" },
    "D":  { m3: "F",  M3: "F♯", d5: "A♭", p5: "A",  a5: "A♯", d7: "C♭",  m7: "C",  M7: "C♯" },
    "D#": { m3: "F♯", M3: "F𝄪", d5: "A",  p5: "A♯", a5: "G𝄪", d7: "C",   m7: "C♯", M7: "C𝄪" },
    "Eb": { m3: "G♭", M3: "G",  d5: "B𝄫", p5: "B♭", a5: "B",  d7: "D𝄫", m7: "D♭", M7: "D" },
    "E":  { m3: "G",  M3: "G♯", d5: "B♭", p5: "B",  a5: "B♯", d7: "D♭",  m7: "D",  M7: "D♯" },
    "F":  { m3: "A♭", M3: "A",  d5: "C♭", p5: "C",  a5: "C♯", d7: "E𝄫", m7: "E♭", M7: "E" },
    "F#": { m3: "A",  M3: "A♯", d5: "C",  p5: "C♯", a5: "C𝄪", d7: "E♭",  m7: "E",  M7: "E♯" },
    "Gb": { m3: "B𝄫", M3: "B♭", d5: "D𝄫", p5: "D♭", a5: "D",  d7: "F𝄫", m7: "F♭", M7: "F" },
    "G":  { m3: "B♭", M3: "B",  d5: "D♭", p5: "D",  a5: "D♯", d7: "F♭",  m7: "F",  M7: "F♯" },
    "G#": { m3: "B",  M3: "B♯", d5: "D",  p5: "D♯", a5: "D𝄪", d7: "F",   m7: "F♯", M7: "F𝄪" },
    "Ab": { m3: "C♭", M3: "C",  d5: "E𝄫", p5: "E♭", a5: "E",  d7: "G𝄫", m7: "G♭", M7: "G" },
    "A":  { m3: "C",  M3: "C♯", d5: "E♭", p5: "E",  a5: "E♯", d7: "G♭",  m7: "G",  M7: "G♯" },
    "A#": { m3: "C♯", M3: "C𝄪", d5: "E",  p5: "E♯", a5: "E𝄪", d7: "G",   m7: "G♯", M7: "G𝄪" },
    "Bb": { m3: "D♭", M3: "D",  d5: "F♭", p5: "F",  a5: "F♯", d7: "A𝄫", m7: "A♭", M7: "A" },
    "B":  { m3: "D",  M3: "D♯", d5: "F",  p5: "F♯", a5: "F𝄪", d7: "A♭",  m7: "A",  M7: "A♯" }
};

const simboloRaiz = {
    "C#": "C♯", "D#": "D♯", "F#": "F♯", "G#": "G♯", "A#": "A♯",
    "Db": "D♭", "Eb": "E♭", "Gb": "G♭", "Ab": "A♭", "Bb": "B♭",
    "C": "C", "D": "D", "E": "E", "F": "F", "G": "G", "A": "A", "B": "B"
};

 

function mostrarExplicacion(tipo) {
    let mensaje = "";

    switch (tipo) {
        case "Perfecto Mayor":
            mensaje = "Explicación P.M: El acorde perfecto mayor se compone de una fundamental, una tercera mayor (4 semitonos) y una quinta justa (7 semitonos).";
            break;
        case "Perfecto Menor":
            mensaje = "Explicación P.m: El acorde perfecto menor consta de una fundamental, una tercera menor (3 semitonos) y una quinta justa (7 semitonos).";
            break;
        case "5ª disminuida":
            mensaje = "Explicación 5ª dim: Formado por fundamental, tercera menor y quinta disminuida (tritono). Es la base del acorde semidisminuido.";
            break;
        case "5ª aumentada":
            mensaje = "Explicación 5ª aug: Contiene fundamental, tercera mayor y quinta aumentada. Genera una sonoridad de tensión armónica.";
            break;
        case "7ª dominante":
            mensaje = "Explicación 7ª dominante: Acorde mayor con una séptima menor. Es el acorde de tensión por excelencia en la armonía tonal.";
            break;
        case "7ª Mayor":
            mensaje = "Explicación 7ª Mayor (maj7): Acorde mayor con una séptima mayor. Muy común en el Jazz y la música popular moderna.";
            break;
        case "Menor 7":
            mensaje = "Explicación Menor 7: Acorde menor con séptima menor. Es el II grado típico de la escala mayor.";
            break;
        case "Semidisminuida":
            mensaje = "Explicación Semidisminuida: Acorde de quinta disminuida con séptima menor (m7b5).";
            break;
        case "Disminuida":
            mensaje = "Explicación Disminuida: Acorde de quinta disminuida con séptima disminuida. Todos sus intervalos son de tercera menor.";
            break;
        default:
            mensaje = "Selecciona un tipo de acorde para ver su explicación.";
    }

    window.alert(mensaje);
}

 

function inicializarPentagrama() {
    const { Renderer, Stave } = Vex.Flow;
    const div = document.getElementById("staff-container");
    div.innerHTML = "";
    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(300, 150);
    const context = renderer.getContext();
    const stave = new Stave(10, 20, 280);
    stave.addClef("treble").setContext(context).draw();
}

function dibujarAcorde(notasOriginales, titulo) {
    const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;
    const div = document.getElementById("staff-container");
    div.innerHTML = "";
    document.getElementById("chord-title").innerText = titulo;

    const renderer = new Renderer(div, Renderer.Backends.SVG);
    renderer.resize(300, 150);
    const context = renderer.getContext();
    const stave = new Stave(10, 20, 280);
    stave.addClef("treble").setContext(context).draw();

    const mapaAcc = { "♯": "#", "♭": "b", "𝄪": "##", "𝄫": "bb" };
    const ordenNotas = ["C", "D", "E", "F", "G", "A", "B"];
    
    let octava = 4;
    const vexKeys = notasOriginales.map((n, i) => {
        let letra = n[0];
        let accOriginal = n.slice(1);
        if (i > 0) {
            let prevIdx = ordenNotas.indexOf(notasOriginales[i-1][0]);
            let currIdx = ordenNotas.indexOf(letra);
            if (currIdx <= prevIdx) octava++;
        }
        let accVex = accOriginal;
        Object.keys(mapaAcc).forEach(k => { accVex = accVex.replace(k, mapaAcc[k]); });
        return { key: `${letra}${accVex}/${octava}`, acc: accVex };
    });

    const chord = new StaveNote({
        clef: "treble",
        keys: vexKeys.map(v => v.key),
        duration: "w"
    });

    vexKeys.forEach((v, i) => {
        if (v.acc) chord.addModifier(new Accidental(v.acc), i);
    });

    const voice = new Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables([chord]);
    new Formatter().joinVoices([voice]).format([voice], 150);
    voice.draw(context, stave);
}

 

function actualizarTodo() {
    const selector = document.getElementById("nota-raiz");
    const raiz = selector.value;
    const datos = diccionarioMusical[raiz];
    const raizBella = simboloRaiz[raiz];
    if (datos) {
        renderTríadas(raizBella, datos);
        renderCuatríadas(raizBella, datos);
    }
}

function renderTríadas(raiz, datos) {
    const tipos = [
        { id: "Perfecto Mayor", nombre: "Perfecto mayor (3ºM, 5ºJ)", suf: "", n: [raiz, datos.M3, datos.p5] },
        { id: "Perfecto Menor", nombre: "Perfecto menor (3ºm, 5ºJ)", suf: "m", n: [raiz, datos.m3, datos.p5] },
        { id: "5ª disminuida", nombre: "De 5ª disminuida (3ºm, 5ªdim)", suf: "dim", n: [raiz, datos.m3, datos.d5] },
        { id: "5ª aumentada", nombre: "De 5ª aumentada (3ºM, 5ªA)", suf: "aug", n: [raiz, datos.M3, datos.a5] }
    ];

    let html = `<table>
        <thead>
            <tr><th colspan="1" class="seccion-titulo">ACORDES TRÍADAS</th><th colspan="3">CIFRADO ARMÓNICO</th><th colspan="3">CIFRADO AMERICANO</th></tr>
            <tr><th class="col-nombre">Tipos de acordes</th><th>Fund.</th><th>1ªinv.</th><th>2ªinv.</th><th>Fund.</th><th>1ªinv.</th><th>2ªinv</th></tr>
        </thead>
        <tbody>`;

    tipos.forEach((tipo, i) => {
        const clase = i % 2 === 0 ? 'odd' : 'even';
        const cifrado = raiz + tipo.suf;
        const n = tipo.n;
        let armonicoCells = i === 0 ? `<td rowspan="4">(5)<br>(3)</td><td rowspan="4">6<br>(3)</td><td rowspan="4">6<br>4</td>` : '';
        
        html += `<tr class="${clase}">
            <td class="col-nombre clickable-title" onclick="mostrarExplicacion('${tipo.id}')">${tipo.nombre}</td>${armonicoCells}
            <td class="col-americano" onclick="dibujarAcorde(['${n[0]}','${n[1]}','${n[2]}'], '${cifrado}')">${cifrado}</td>
            <td class="col-americano" onclick="dibujarAcorde(['${n[1]}','${n[2]}','${n[0]}'], '${cifrado}/${n[1]}')">${cifrado}/${n[1]}</td>
            <td class="col-americano" onclick="dibujarAcorde(['${n[2]}','${n[0]}','${n[1]}'], '${cifrado}/${n[2]}')">${cifrado}/${n[2]}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById("tabla-triadas").innerHTML = html;
}

function renderCuatríadas(raiz, datos) {
    const tipos = [
        { id: "7ª dominante", nombre: "7ª de dominante (3ªM, 5ªJ, 7ªm)", suf: "7", arm: ["7<br>+", "6<br><s>5</s>", "+6", "+4"], n: [raiz, datos.M3, datos.p5, datos.m7] },
        { id: "7ª Mayor", nombre: "7ª Mayor (maj7)", suf: "maj7", arm: ["7", "6<br>5", "4<br>3", "2"], n: [raiz, datos.M3, datos.p5, datos.M7] },
        { id: "Menor 7", nombre: "Menor 7 (m7)", suf: "m7", arm: ["7", "6<br>5", "4<br>3", "2"], n: [raiz, datos.m3, datos.p5, datos.m7] },
        { id: "Semidisminuida", nombre: "Semidisminuida", suf: "m7♭5", arm: ["7<br><s>5</s>", "6<br>5", "4<br>3", "2"], n: [raiz, datos.m3, datos.d5, datos.m7] },
        { id: "Disminuida", nombre: "Disminuida (dim7)", suf: "dim7", arm: ["<s>7</s>", "6<br>5", "4<br>3", "2"], n: [raiz, datos.m3, datos.d5, datos.d7] }
    ];

    let html = `<table>
        <thead>
            <tr><th colspan="1" class="seccion-titulo">ACORDES CUATRÍADAS</th><th colspan="4">CIFRADO ARMÓNICO</th><th colspan="4">CIFRADO AMERICANO</th></tr>
            <tr><th class="col-nombre">Tipos de acordes</th><th>F</th><th>1ª</th><th>2ª</th><th>3ª</th><th>Fund.</th><th>1ªinv.</th><th>2ªinv.</th><th>3ªinv.</th></tr>
        </thead>
        <tbody>`;

    tipos.forEach((tipo, i) => {
        const clase = i % 2 === 0 ? 'odd' : 'even';
        const cifrado = raiz + tipo.suf;
        const n = tipo.n;
        html += `<tr class="${clase}">
            <td class="col-nombre clickable-title" onclick="mostrarExplicacion('${tipo.id}')">${tipo.nombre}</td>
            <td class="col-armonico">${tipo.arm[0]}</td><td class="col-armonico">${tipo.arm[1]}</td><td class="col-armonico">${tipo.arm[2]}</td><td class="col-armonico">${tipo.arm[3]}</td>
            <td class="col-americano" onclick="dibujarAcorde(['${n[0]}','${n[1]}','${n[2]}','${n[3]}'], '${cifrado}')">${cifrado}</td>
            <td class="col-americano" onclick="dibujarAcorde(['${n[1]}','${n[2]}','${n[3]}','${n[0]}'], '${cifrado}/${n[1]}')">${cifrado}/${n[1]}</td>
            <td class="col-americano" onclick="dibujarAcorde(['${n[2]}','${n[3]}','${n[0]}','${n[1]}'], '${cifrado}/${n[2]}')">${cifrado}/${n[2]}</td>
            <td class="col-americano" onclick="dibujarAcorde(['${n[3]}','${n[0]}','${n[1]}','${n[2]}'], '${cifrado}/${n[3]}')">${cifrado}/${n[3]}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById("tabla-cuatriadas").innerHTML = html;
}

window.onload = () => {
    actualizarTodo();
    inicializarPentagrama();
};


function renderSeriesArmonicas() {
    const { Renderer, Stave, StaveConnector } = Vex.Flow;
    const container = document.getElementById('series-container');
    if (!container) return;

    container.innerHTML = '';
    const padding = 40;
    const width = Math.max(container.clientWidth, 320);
    const height = 240;

    const renderer = new Renderer(container, Renderer.Backends.SVG);
    renderer.resize(width, height);
    const context = renderer.getContext();

    const staveWidth = width - padding;
    const leftX = 10;

    
    const topStave = new Stave(leftX, 20, staveWidth);
    topStave.addClef('treble').setContext(context).draw();

    
    const bottomStave = new Stave(leftX, 120, staveWidth);
    bottomStave.addClef('bass').setContext(context).draw();

    
    const brace = new StaveConnector(topStave, bottomStave);
    brace.setType(StaveConnector.type.BRACE);
    brace.setContext(context).draw();

    const leftConnector = new StaveConnector(topStave, bottomStave);
    leftConnector.setType(StaveConnector.type.SINGLE);
    leftConnector.setContext(context).draw();

    const rightConnector = new StaveConnector(topStave, bottomStave);
    rightConnector.setType(StaveConnector.type.SINGLE);
    rightConnector.setContext(context).draw();

    
    try {
      const topNotes = new StaveNote({ clef: 'treble', keys: ['e/4','c/5','a/4'], duration: 'w' });
      const bottomNotes = new StaveNote({ clef: 'bass', keys: ['c/3','g/2','e/3'], duration: 'w' });

      
      const topVoice = new Voice({ num_beats: 4, beat_value: 4 });
      topVoice.addTickables([topNotes]);
      const bottomVoice = new Voice({ num_beats: 4, beat_value: 4 });
      bottomVoice.addTickables([bottomNotes]);

      new Formatter().joinVoices([topVoice]).format([topVoice], staveWidth - 20);
      new Formatter().joinVoices([bottomVoice]).format([bottomVoice], staveWidth - 20);

      topVoice.draw(context, topStave);
      bottomVoice.draw(context, bottomStave);
        } catch (err) {
            console.warn('VexFlow draw example failed:', err);
        }
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(renderSeriesArmonicas, 150);
  });

    window.addEventListener('load', renderSeriesArmonicas);

