import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sistema de Cultura de Barra Mansa",
    short_name: "Culturalize",
    description:
      "O projeto 'Culturalize' é uma plataforma online em conformidade com as leis Aldir Blanc e Paulo Gustavo, fornecendo apoio financeiro, visibilidade e oportunidades para artistas, produtores e espaços culturais brasileiros afetados pela pandemia. Oferecemos bolsas, financiamento para projetos, divulgação de eventos e networking, promovendo transparência e equidade na distribuição de recursos. Junte-se a nós para fortalecer a cultura brasileira e construir um futuro mais vibrante para as artes no país.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#1976D2",
    icons: [
      {
        src: "/paulo_gustavo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/theater.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "login_background.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  };
}
