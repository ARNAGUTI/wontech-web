import { Message } from "../types/chat";

// Respuestas especializadas para el Agente de Casos Wontech
const wontechResponses = [
  "Basado en la información proporcionada, este caso sí está cubierto por la garantía Wontech según la sección 2.3 de nuestra política de garantías. Puede proceder con el reemplazo del producto.",
  "Lamentablemente, este caso no califica para cobertura de garantía ya que el daño reportado es resultado de un uso inadecuado según lo estipulado en la sección 4.1 de nuestras excepciones de garantía.",
  "Para evaluar correctamente este caso de garantía, necesito información adicional: ¿podría proporcionar la fecha de compra y el número de serie del dispositivo?",
  "Según nuestra política de garantías, este problema está parcialmente cubierto. El reemplazo de componentes electrónicos está cubierto, pero los daños cosméticos mencionados no lo están. Recomiendo proceder con la reparación parcial bajo garantía.",
  "Este caso está cubierto por la garantía extendida que el cliente adquirió. Por favor proceda con la autorización de reparación completa sin costo adicional para el cliente.",
  "De acuerdo a nuestras políticas actuales, aunque el período estándar de garantía ha expirado, este caso califica para nuestro programa de excepción de buena voluntad debido a la naturaleza del defecto reportado. Recomiendo aprobar la reparación.",
  "La garantía Wontech no cubre daños por exposición a líquidos como se menciona en la sección 3.2 de nuestras excepciones. Por favor informe al cliente sobre nuestro programa de reparación con descuento para estos casos.",
  "Este caso requiere escalamiento al departamento técnico especializado para una evaluación más detallada. Basado en la información preliminar, existe posibilidad de que se trate de un defecto de fabricación cubierto por nuestra garantía extendida.",
  "El producto mencionado se encuentra dentro de nuestro recall de seguridad anunciado el mes pasado. Por favor proceda con el reemplazo inmediato según el protocolo de recall, independientemente del estado de la garantía.",
  "Según nuestra base de datos, este cliente ya ha utilizado el máximo de reclamos permitidos bajo esta garantía. Sin embargo, como cliente Premium, puede acceder a una reparación con descuento del 50%."
];

// Sistema de análisis de mensajes para el contexto de garantías Wontech
const analyzeUserMessage = (message: string): string => {
  console.log("Analizando consulta de garantía:", message);
  
  // Normalizar mensaje para mejor detección de patrones
  const normalizedMessage = message.toLowerCase().trim();
  
  // Detección de saludos o inicios de conversación
  if (/^(hola|buenos días|buenas tardes|buenas noches|saludos)/.test(normalizedMessage)) {
    console.log("Detectado saludo inicial");
    return "Hola, soy el Agente de Casos Wontech. Estoy aquí para revisar su solicitud de garantía y determinar si su caso está cubierto. ¿En qué puedo ayudarle hoy?";
  }
  
  // Detección de consultas sobre garantía
  if (normalizedMessage.includes("garantía") || normalizedMessage.includes("cubierto") || 
      normalizedMessage.includes("warranty") || normalizedMessage.includes("cobertura")) {
    console.log("Detectada consulta sobre garantía");
    
    // Respuestas específicas según contexto
    if (normalizedMessage.includes("expirada") || normalizedMessage.includes("vencida")) {
      return "Si su garantía ha expirado, podríamos evaluar el caso bajo nuestro programa de excepciones. Para determinar si califica, necesito el modelo exacto del producto, fecha de compra y una descripción detallada del problema.";
    }
    
    if (normalizedMessage.includes("extension") || normalizedMessage.includes("extender") || normalizedMessage.includes("ampliar")) {
      return "Wontech ofrece extensiones de garantía de 1 o 2 años adicionales para productos seleccionados. Para verificar si su producto califica y conocer las tarifas correspondientes, por favor proporcione el modelo y fecha de compra original.";
    }
    
    // Para preguntas generales sobre política de garantía
    if (normalizedMessage.includes("política") || normalizedMessage.includes("condiciones") || normalizedMessage.includes("términos")) {
      return "La política de garantía Wontech cubre defectos de fabricación por un período de 12 meses desde la fecha de compra. Exceptuamos daños por mal uso, exposición a líquidos, modificaciones no autorizadas y desgaste normal. ¿Desea conocer algún aspecto específico de nuestra garantía?";
    }
  }
  
  // Detección de descripción de problemas técnicos
  if (normalizedMessage.includes("roto") || normalizedMessage.includes("dañado") || 
      normalizedMessage.includes("no funciona") || normalizedMessage.includes("problema") ||
      normalizedMessage.includes("error") || normalizedMessage.includes("falla")) {
    console.log("Detectada descripción de problema técnico");
    return "Basado en la descripción del problema, necesito información adicional para determinar la cobertura de garantía: 1) ¿Cuándo compró el producto? 2) ¿El problema ocurrió de repente o gradualmente? 3) ¿Ha intentado alguna solución por su cuenta? Esta información nos ayudará a evaluar correctamente su caso.";
  }
  
  // Detección de solicitud de contacto o escalamiento
  if (normalizedMessage.includes("hablar") || normalizedMessage.includes("supervisor") || 
      normalizedMessage.includes("gerente") || normalizedMessage.includes("técnico") ||
      normalizedMessage.includes("especialista")) {
    console.log("Detectada solicitud de escalamiento");
    return "Entiendo que desea comunicarse con un especialista. Puedo transferir su caso al departamento técnico especializado de Wontech. Antes de hacerlo, ¿podría proporcionarme su número de caso o factura para referencia? Esto agilizará el proceso cuando se comuniquen con usted.";
  }
  
  // Para mensajes cortos o poco claros
  if (normalizedMessage.length < 15) {
    console.log("Mensaje corto detectado");
    return "Para ayudarle con su caso de garantía Wontech, necesito más detalles. Por favor describa el problema que está experimentando con su producto, cuándo lo compró y si ha realizado algún tipo de modificación o reparación por su cuenta.";
  }
  
  // Respuesta general para mensajes más largos o complejos
  console.log("Usando respuesta especializada de garantía");
  const randomIndex = Math.floor(Math.random() * wontechResponses.length);
  return wontechResponses[randomIndex];
};

export const sendMessageToOpenAI = async (messages: Message[]): Promise<string> => {
  try {
    console.log("Procesando consulta de garantía Wontech...");
    
    // Simular latencia de red para comportamiento realista
    const randomDelay = Math.floor(Math.random() * 1000) + 500; // 500-1500ms
    await new Promise(resolve => setTimeout(resolve, randomDelay));
    
    // Obtener el último mensaje del usuario
    const lastUserMessage = messages.filter(msg => msg.role === 'user').pop();
    
    if (!lastUserMessage) {
      console.warn("No se encontró mensaje del cliente para procesar");
      return "No hay consulta para procesar. Por favor, describa su situación para que podamos evaluar su caso de garantía.";
    }
    
    console.log(`Consulta recibida (${lastUserMessage.content.length} caracteres):`, lastUserMessage.content);
    
    // Generar respuesta apropiada basada en análisis del mensaje
    const response = analyzeUserMessage(lastUserMessage.content);
    
    console.log("Respuesta del agente generada:", response);
    return response;
    
  } catch (error) {
    console.error("Error al procesar la consulta de garantía:", error);
    throw new Error("No se pudo procesar su consulta en este momento. Por favor, inténtelo de nuevo más tarde o contacte directamente a soporte técnico Wontech al 555-123-4567.");
  }
};
