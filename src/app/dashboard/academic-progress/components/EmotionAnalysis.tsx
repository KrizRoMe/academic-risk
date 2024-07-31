import { Span } from "next/dist/trace";
import React from "react";
interface EmotionData {
  [key: string]: number;
}

interface BarChartProps {
  emotionData: EmotionData;
}

const EmotionAnalysis: React.FC<BarChartProps> = ({ emotionData }) => {
  let data: { name: string; value: number; emoji: string }[] = [];

  if (emotionData) {
    const emotions = [
      { name: "alegria", emoji: "😄" },
      { name: "tristeza", emoji: "😢" },
      { name: "enojo", emoji: "😡" },
      { name: "miedo", emoji: "😱" },
      { name: "cansancio", emoji: "😩" },
    ];

    data = emotions.map((emotion) => ({
      ...emotion,
      value: emotionData[emotion.name],
    }));

    data.sort((a, b) => b.value - a.value);
  }

  const recommendations: { [key: string]: string } = {
    alegria:
      "Continúa participando en actividades que te generan alegría. Mantén un diario de gratitud para reforzar estos sentimientos positivos.",
    tristeza:
      "Considera hablar con un consejero o terapeuta para abordar las fuentes de tristeza. Practica técnicas de mindfulness y autocuidado.",
    enojo:
      "Practica técnicas de manejo de la ira, como la respiración profunda y la meditación. Considera hablar con un profesional de la salud mental si el enojo está afectando tu calidad de vida.",
    miedo:
      "Identifica las fuentes de miedo y trabaja en estrategias de afrontamiento. Técnicas de respiración y meditación pueden ayudar.",
    cansancio:
      "Asegúrate de estar obteniendo suficiente sueño. Considera hablar con un médico si el cansancio persiste.",
  };
  console.log(data);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
        Análisis de Emociones
      </h4>
      {data.length >= 3 ? (
        <p className="mb-4 rounded-lg bg-slate-100 dark:bg-black dark:text-white text-black p-4">
          En el gráfico de barras anterior, se muestra la frecuencia de diversas
          emociones detectadas en tus conversaciones con el chatbot. La emoción
          más predominante es la {data[0].name} {data[0].emoji},
          {data[1].value > 0
            ? "seguida de " + data[1].name + " " + data[1].emoji + ","
            : ""}
          {data[1].value > 0
            ? "y " + data[1].name + " " + data[1].emoji + ","
            : ""}
        </p>
      ) : (
        <span>Vuelve despues de una tutoría</span>
      )}

      {data.length >= 3 ? (
        <>
          {" "}
          <h4 className="text-xl font-semibold text-black dark:text-white mb-2">
            Recomendaciones Personalizadas
          </h4>
          <ul className="list-inside list-disc rounded-lg bg-slate-100 dark:bg-black dark:text-white text-black p-4">
            {data
              .filter((emotion) => emotion.value > 0)
              .slice(0, 3)
              .map((emotion) => (
                <li key={emotion.name}>
                  <strong>
                    {emotion.name.charAt(0).toUpperCase() +
                      emotion.name.slice(1)}
                  </strong>
                  : {recommendations[emotion.name]}
                </li>
              ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default EmotionAnalysis;
