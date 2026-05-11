import { useLanguage } from "@/i18n/LanguageContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import React, { useState } from "react";

const testimonials = [
	{
		name: "Henrique Silveira",
		role: "QA Engineer | Automação de Testes | Cypress | Playwright | API & Agile Testing",
		date: "19 de janeiro de 2026",
		relationship: "Henrique trabalhou na mesma equipe que Kelven",
		photo: "https://media.licdn.com/dms/image/v2/D4D03AQF4QStfR7-5XQ/profile-displayphoto-scale_100_100/B4DZv_dxvuIgAc-/0/1769517555173?e=1779926400&v=beta&t=ZoxaHVWh3XKsOC4PpdtQV1ydu4ywcqfSSSeLxfabYoQ",
		testimonial:
			"Kelven é um QA fora da curva, ele é detalhista, questionador, comunicativo, colaborador. Sempre o vi em reuniões questionando, gerando discussões visando entrega de valor ao produto/feature. Desenvolve muito bem uma automação. Ter Kelven no time é saber que irá ter um profissional que não deixará o time de lado mas sim avançar com o time, atuar com o time.",
	},
	{
		name: "Thayná Dias",
		role: "Engenheiro de QA de software @ Conta Bemol | Automation & Manual Testing | Python & Cypress | APIs & Mobile",
		date: "2 de setembro de 2025",
		relationship: "Thayná trabalhou com Kelven, mas em equipes diferentes",
		photo: "https://media.licdn.com/dms/image/v2/D4E03AQH2PemMSNEvGQ/profile-displayphoto-scale_100_100/B4EZvhwx3gIIAg-/0/1769019224194?e=1779926400&v=beta&t=Kwd7GlQXhwcJEOlXcbu6tofb5cjxU-m2xy8Jo7zDRMs",
		testimonial:
			"Tenho a oportunidade de trabalhar frequentemente com o Kelven e sempre admirei sua postura proativa e colaborativa. Ele é um profissional que está sempre disponível para apoiar e auxiliar com detalhes importantes que contribuem para a melhoria contínua dos processos. Além de ser extremamente dedicado, Kelven possui sólida experiência em automação, o que trouxe ganhos significativos para a qualidade dos projetos. Ele constantemente propõe melhorias que elevam o nível do time e do produto, demonstrando visão estratégica e foco em resultados. Outro ponto de destaque é sua excelente comunicação, que torna o trabalho em equipe ainda mais produtivo e eficiente. Sem dúvida, Kelven é um grande diferencial em qualquer time em que atua.",
	},
	{
		name: "João Victor Silva",
		role: "Software Developer | Mobile & Web Dev | Typescript | HTML | Scss | Angular | NextJS | VueJs | React Native | Flutter",
		date: "24 de fevereiro de 2023",
		relationship: "João Victor trabalhou na mesma equipe que Kelven",
		photo: "https://media.licdn.com/dms/image/v2/D4D03AQFNb_7CQOXN2w/profile-displayphoto-scale_100_100/B4DZziLgkZJQAc-/0/1773321197758?e=1779926400&v=beta&t=3v_4fyKjnGWO9MfeiHYzVE5v8DrNC7bLh8yaQv0R1vw",
		testimonial:
			"Kelven é um profissional altamente competente em testes de software, com um sólido conhecimento técnico e habilidade em resolução de problemas. Sua comunicação efetiva e habilidade em trabalho em equipe foram essenciais para garantir que o software atenda às necessidades do cliente. Ele tem uma atitude curiosa e criativa, pensando fora da caixa para encontrar problemas que outros membros da equipe podem ter ignorado.",
	},
	{
		name: "Ketllen Oliveira",
		role: "Product Designer Pleno @ LG Electronics | UI/UX, Human-Computer Interaction",
		date: "24 de fevereiro de 2023",
		relationship: "Ketllen trabalhou na mesma equipe que Kelven",
		photo: "https://media.licdn.com/dms/image/v2/D4E03AQEvuBPUQ5f8Zw/profile-displayphoto-scale_100_100/B4EZ1zBeLpG4Ac-/0/1775751265613?e=1779926400&v=beta&t=iEOJ6xAuNfbtnSyoiZjJfQQEhXHBdePeZopAZ-vzFDA",
		testimonial:
			"Eu tive a oportunidade de trabalhar com o Kelven em um projeto de desenvolvimento de software e fiquei extremamente impressionado com sua habilidade tanto como tester quanto como desenvolvedor. Sua abordagem analítica e minuciosa para testar o software foi fundamental para garantir que o produto final atendesse às expectativas dos usuários. Além disso, Kelven foi capaz de contribuir significativamente para o desenvolvimento de novos recursos e aprimoramentos do software, trazendo soluções criativas e eficazes para os desafios enfrentados durante o projeto.",
	},
	{
		name: "Renan Barroncas",
		role: "Product Owner | Liderança de Produtos Digitais | Inteligência Artificial (GenAI) & Cloud AWS | Indústria 4.0 & IoT | Mestrando em Engenharia Elétrica",
		date: "24 de fevereiro de 2023",
		relationship: "Renan trabalhou na mesma equipe que Kelven",
		photo: "https://media.licdn.com/dms/image/v2/D4D03AQHgD4dKrZae7w/profile-displayphoto-shrink_100_100/B4DZVYiPXFHkAU-/0/1740947126429?e=1779926400&v=beta&t=KU4mnw8Xkxb5hSB5_FTRP3OyxxXy9wr_6rZktAPrj24",
		testimonial:
			"Recomendo fortemente o Kelven para qualquer empresa que esteja procurando por um profissional altamente qualificado em automação de testes de software. Durante o tempo que trabalhamos juntos, fiquei impressionado com sua expertise em ferramentas de automação de testes e frameworks, além de sua compreensão profunda dos princípios de teste de software. Sua capacidade de liderar equipes de automação de teste e relatar resultados de testes em tempo hábil é excepcional. Ele certamente trará grande valor à sua equipe e aos seus projetos.",
	},
];

const Testimonials = () => {
	const { t } = useLanguage();
	const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

	const toggleExpand = (index: number) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	return (
		<section id="testimonials" className="section-padding border-t border-border">
			<div className="section-container">
				<div className="text-center">
					<p className="mb-2 font-mono-stack text-xs uppercase tracking-widest text-primary">
						{t.testimonials.label}
					</p>
					<h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						{t.testimonials.title}
					</h2>
				</div>

				<Swiper
					modules={[Navigation, Pagination]}
					spaceBetween={20}
					slidesPerView={1}
					navigation
					pagination={{ clickable: true }}
					loop={true}
					breakpoints={{
						640: { slidesPerView: 1 },
						1024: { slidesPerView: 2 },
						1440: { slidesPerView: 3 },
					}}
					className="mt-10"
				>
					{testimonials.map((item, index) => (
						<SwiperSlide key={index}>
							<div className="card-elevated group overflow-hidden rounded-xl p-6 bg-background shadow-lg h-[400px] flex flex-col justify-between transition-transform duration-300 transform hover:scale-105">
								<div className="flex flex-col items-center text-center">
									<div className="w-24 h-24 mb-4">
										<img
											src={item.photo}
											alt={item.name}
											className="w-full h-full object-cover rounded-full border-2 border-primary"
										/>
									</div>
									<h3 className="text-lg font-bold">{item.name}</h3>
									<p className="text-sm text-muted-foreground">{item.role}</p>
									<p className="text-xs text-muted-foreground">{item.date}</p>
								</div>
								<div className="text-sm mt-4 overflow-y-auto max-h-[200px] custom-scrollbar">
									<p
										className="text-foreground"
										style={{ whiteSpace: "pre-wrap" }}
									>
										{item.testimonial}
									</p>
								</div>
								<p className="text-xs text-muted-foreground mt-2">
									{item.relationship}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</section>
	);
};

// Add custom scrollbar styles
const customStyles = `
.custom-scrollbar::-webkit-scrollbar {
	width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
	background-color: var(--primary);
	border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
	background-color: var(--background);
}
`;

// Inject custom styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

export default Testimonials;