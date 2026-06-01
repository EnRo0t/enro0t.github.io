fetch("json/blog.json")
.then(response => {
        if(!response.ok) {
                throw new Error("No se pudo cargar el archivo JSON");
        }
        return response.json();
})
.then(blog => {
        const contenedor = document.getElementById('contenedor-blog');
        contenedor.innerHTML = ""; // Limpiamos el contenedor

        // 1. Creamos las variables para separar el destacado de la cuadrícula
        let htmlDestacado = "";
        let htmlGridContenido = "";

        // 2. Recorremos los blogs usando el índice (index)
        blog.forEach((b, index) => {
                if (index === 0) {
                        // El primer artículo del JSON se convierte en el "Outstanding"
                        htmlDestacado = `
                        <div class="outstanding">
                                <img src="${b.imgPath}" class="imagen-portada" alt="${b.titulo}"/>
                                <div class="outstanding-content">
                                        <h2>${b.titulo}</h2>
                                        <p class="fecha"><b>${b.fecha}</b></p>
                                        <p>${b.descripcion}</p>
                                        <a href="${b.filePath}" class="leer">Leer más</a>
                                </div>
                        </div>`;
                } else {
                        // Los siguientes artículos (índice 1, 2, 3...) se acumulan para la cuadrícula
                        htmlGridContenido += `
                        <div class="grid-blog-article">
                                <img src="${b.imgPath}" alt="${b.titulo}"/>
                                <div class="grid-blogs-content">
                                        <h3>${b.titulo}</h3>
                                        <p><b>${b.fecha}</b></p>
                                        <p>${b.descripcion}</p>
                                        <a href="${b.filePath}" class="leer">Leer más</a>
                                </div>
                        </div>`;
                }
        });

        // 3. Inyectamos el destacado y, justo abajo, envolvemos el contenido del grid en su contenedor padre
        contenedor.innerHTML = `
                ${htmlDestacado}
                <div class="grid-blogs">
                        ${htmlGridContenido}
                </div>
        `;
})
.catch(error => {
        console.error("Error al cargar la portada:", error);
});
