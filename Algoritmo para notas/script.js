document.addEventListener('DOMContentLoaded', function() {
    // Calcular Nota Final
    document.getElementById('calcularNotaFinal').addEventListener('click', function() {
        const nota1 = parseFloat(document.getElementById('nota1').value);
        const nota2 = parseFloat(document.getElementById('nota2').value);
        const nota3 = parseFloat(document.getElementById('nota3').value);

        if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || nota1 < 0 || nota1 > 5 || nota2 < 0 || nota2 > 5 || nota3 < 0 || nota3 > 5) {
            document.getElementById('resultadoFinal').textContent = "Por favor, ingrese notas válidas entre 0 y 5.";
            return;
        }

        const notaFinal = (nota1 * 0.30) + (nota2 * 0.30) + (nota3 * 0.40);
        document.getElementById('resultadoFinal').textContent = "Nota Final: " + notaFinal.toFixed(2);
    });

    // Calcular Nota Necesaria
    document.getElementById('calcularNotaNecesaria').addEventListener('click', function() {
        const notaObjetivo = parseFloat(document.getElementById('notaObjetivo').value);
        const corteConocido = document.getElementById('corteConocido').value;
        const notaConocida1 = parseFloat(document.getElementById('notaConocida1').value);
        const notaConocida2 = parseFloat(document.getElementById('notaConocida2').value);

        if (isNaN(notaObjetivo) || isNaN(notaConocida1) || isNaN(notaConocida2) || notaObjetivo < 0 || notaObjetivo > 5 || notaConocida1 < 0 || notaConocida1 > 5 || notaConocida2 < 0 || notaConocida2 > 5) {
            document.getElementById('resultadoNecesario').textContent = "Por favor, ingrese notas válidas entre 0 y 5.";
            return;
        }

        let notaNecesaria;
        let mensaje;

        switch (corteConocido) {
            case '1': // Calcular nota necesaria en el Corte 1
                notaNecesaria = (notaObjetivo - (notaConocida1 * 0.30) - (notaConocida2 * 0.40)) / 0.30;
                mensaje = "Necesita " + notaNecesaria.toFixed(2) + " en el Corte 1.";
                break;
            case '2': // Calcular nota necesaria en el Corte 2
                notaNecesaria = (notaObjetivo - (notaConocida1 * 0.30) - (notaConocida2 * 0.40)) / 0.30;
                mensaje = "Necesita " + notaNecesaria.toFixed(2) + " en el Corte 2.";
                break;
            case '3': // Calcular nota necesaria en el Corte 3
                notaNecesaria = (notaObjetivo - (notaConocida1 * 0.30) - (notaConocida2 * 0.30)) / 0.40;
                mensaje = "Necesita " + notaNecesaria.toFixed(2) + " en el Corte 3.";
                break;
        }

        document.getElementById('resultadoNecesario').textContent = mensaje;
    });
});