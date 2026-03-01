const diccionarioMusical = {
    "C":  { m3: "E♭", M3: "E",  d5: "G♭", p5: "G",  a5: "G♯", d7: "B𝄫", m7: "B♭", M7: "B" },
    "C#": { m3: "E",  M3: "E♯", d5: "G",  p5: "G♯", a5: "G𝄪", d7: "B♭",  m7: "B",  M7: "B♯" },
    "Db": { m3: "F♭", M3: "F",  d5: "A𝄫", p5: "A♭", a5: "A",  d7: "C𝄫", m7: "C♭", M7: "C" },
    "D":  { m3: "F",  M3: "F♯", d5: "A♭", p5: "A",  a5: "A♯", d7: "C♭",  m7: "C",  M7: "C♯" },
    "D#": { m3: "F♯", M3: "F𝄪", d5: "A",  p5: "A♯", a5: "A𝄪", d7: "C",   m7: "C♯", M7: "C𝄪" },
    "Eb": { m3: "G♭", M3: "G",  d5: "B𝄫", p5: "B♭", a5: "B",  d7: "D𝄫", m7: "D♭", M7: "D" },
    "E":  { m3: "G",  M3: "G♯", d5: "B♭", p5: "B",  a5: "B♯", d7: "D♭",  m7: "D",  M7: "E♯" },
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

function actualizarTodo() {
    const selector = document.getElementById("nota-raiz");
    if (!selector) return;
    
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
        { nombre: "Perfecto mayor (3ºM, 5ºJ)", suf: "", t: datos.M3, q: datos.p5 },
        { nombre: "Perfecto menor (3ºm, 5ºJ)", suf: "m", t: datos.m3, q: datos.p5 },
        { nombre: "De 5ª disminuida (3ºm, 5ªdim)", suf: "dim", t: datos.m3, q: datos.d5 },
        { nombre: "De 5ª aumentada (3ºM, 5ªA)", suf: "aug", t: datos.M3, q: datos.a5 }
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
        let armonicoCells = i === 0 ? `<td rowspan="4">(5)<br>(3)</td><td rowspan="4">6<br>(3)</td><td rowspan="4">6<br>4</td>` : '';
        html += `<tr class="${clase}">
            <td class="col-nombre">${tipo.nombre}</td>${armonicoCells}
            <td>${cifrado}</td><td>${cifrado}/${tipo.t}</td><td>${cifrado}/${tipo.q}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById("tabla-triadas").innerHTML = html;
}

function renderCuatríadas(raiz, datos) {
    const tipos = [
        { nombre: "7ª de dominante (3ªM, 5ªJ, 7ªm)", suf: "7", arm: ["7<br>+", "6<br><s>5</s>", "+6", "+4"], t: datos.M3, q: datos.p5, s: datos.m7 },
        { nombre: "3ªM, 5ªJ, 7ªM", suf: "maj7", arm: ["7", "6<br>5", "4<br>3", "(4)<br>2"], t: datos.M3, q: datos.p5, s: datos.M7 },
        { nombre: "3ªM, 5ªA, 7ªM", suf: "maj7♯5", arm: ["7", "6<br>5", "4<br>3", "(4)<br>2"], t: datos.M3, q: datos.a5, s: datos.M7 },
        { nombre: "3ªM, 5ªA, 7ªm", suf: "7♯5", arm: ["7", "6<br>5", "4<br>3", "(4)<br>2"], t: datos.M3, q: datos.a5, s: datos.m7 },
        { nombre: "3ªm, 5ªJ, 7ªm", suf: "m7", arm: ["7", "6<br>5", "4<br>3", "(4)<br>2"], t: datos.m3, q: datos.p5, s: datos.m7 },
        { nombre: "3ªm, 5ªd, 7ªm (Semidis.)", suf: "m7♭5", arm: ["7<br><s>5</s>", "6<br>5", "4<br>3", "(4)<br>2"], t: datos.m3, q: datos.d5, s: datos.m7 },
        { nombre: "3ªm, 5ªd, 7ªd (Disminuida)", suf: "dim7", arm: ["<s>7</s>", "6<br>5", "4<br>3", "(4)<br>2"], t: datos.m3, q: datos.d5, s: datos.d7 }
    ];

    let html = `<table>
        <thead>
            <tr><th colspan="1" class="seccion-titulo">ACORDES CUATRÍADAS</th><th colspan="4">CIFRADO ARMÓNICO</th><th colspan="4">CIFRADO AMERICANO</th></tr>
            <tr><th class="col-nombre">Tipos de acordes</th>
                <th>Fund.</th><th>1ªinv.</th><th>2ªinv.</th><th>3ªinv.</th>
                <th>Fund.</th><th>1ªinv.</th><th>2ªinv.</th><th>3ªinv.</th>
            </tr>
        </thead>
        <tbody>`;

    tipos.forEach((tipo, i) => {
        const clase = i % 2 === 0 ? 'odd' : 'even';
        const cifrado = raiz + tipo.suf;
        html += `<tr class="${clase}">
            <td class="col-nombre">${tipo.nombre}</td>
            <td class="col-armonico">${tipo.arm[0]}</td>
            <td class="col-armonico">${tipo.arm[1]}</td>
            <td class="col-armonico">${tipo.arm[2]}</td>
            <td class="col-armonico">${tipo.arm[3]}</td>
            <td class="col-americano">${cifrado}</td>
            <td class="col-americano">${cifrado}/${tipo.t}</td>
            <td class="col-americano">${cifrado}/${tipo.q}</td>
            <td class="col-americano">${cifrado}/${tipo.s}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById("tabla-cuatriadas").innerHTML = html;
}

window.onload = () => {
    actualizarTodo();
    document.getElementById("nota-raiz").addEventListener("change", actualizarTodo);
};