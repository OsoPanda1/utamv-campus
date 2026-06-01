# Bibliotecas de Machine Learning — Corpus UTAMV / Isabella Kernel

> Fuente curada: IBM Think (David Zax) + síntesis institucional UTAMV.
> Uso: corpus de referencia para Isabella IA, módulo "Machine Learning Aplicado"
> del Master Profesional UTAMV y línea de investigación CITEMESH / IA Soberana.

## I. INTRODUCCION A ML

Machine learning (ML) busca patrones en grandes volúmenes de datos. El stack
moderno se apoya en bibliotecas open source que encapsulan álgebra lineal,
optimización, redes neuronales y MLOps.

Disciplinas cubiertas en el currículo UTAMV:
- Ciencia de datos para ML
- Ingeniería de características
- Aprendizaje supervisado / no supervisado / semisupervisado / por refuerzo
- Aprendizaje profundo (deep learning)
- IA generativa
- Entrenamiento, evaluación y despliegue (MLOps)
- NLP y Visión Artificial

## II. BIBLIOTECAS GENERALES (INFRAESTRUCTURA)

### NumPy
Base matemática de todo el ecosistema Python ML. Provee arrays
n-dimensionales (tensores) y álgebra lineal. No soporta GPU; demasiado
limitada para deep learning moderno, pero indispensable como cimiento.

### TensorFlow
Creada por Google Brain (2015), open source. Corre en CPU, GPU y TPU.
Ideal para deep learning a escala productiva, NLP, visión y reconocimiento
de imágenes. Fuerte en despliegue empresarial.

### Keras
API de alto nivel (originalmente sobre TensorFlow, hoy multi-backend
incluido PyTorch). Conocida por documentación clara y curva de aprendizaje
amable.

### PyTorch
Originada en Meta (2016), hoy en Linux Foundation. Diseño pythonic,
flexible, favorita en investigación y cada vez más en producción
(Tesla Autopilot, Azure, IBM watsonx). Permite operaciones tipo NumPy
con aceleración GPU. Ecosistema: Torchvision, TorchText, Lightning.

### Scikit-learn (sklearn)
Interopera con NumPy/SciPy. Algoritmos clásicos: clasificación, regresión,
clustering, árboles de decisión, pipelines. Excelente para enseñanza,
prototipado y modelos no profundos. Sin aceleración GPU.

### XGBoost
Gradient boosting de alto rendimiento. Estándar de oro para datos
tabulares y competencias Kaggle.

## III. BIBLIOTECAS ESPECIALIZADAS

### Análisis de datos: pandas
DataFrames sobre NumPy. Manipulación de datasets reales (limpieza,
agregación, joins).

### Visualización: matplotlib + seaborn
matplotlib produce gráficos base; seaborn añade estética y soporta
DataFrames de pandas directamente.

### Tracking de experimentos: MLflow
Registro de modelos, parámetros, métricas; gestión del ciclo de vida.

### NLP y modelos pre-entrenados: Hugging Face Transformers
Acceso inmediato a miles de modelos (BERT, GPT, Llama, Mistral).

### Aprendizaje por refuerzo: Stable-Baselines3
Algoritmos RL listos para usar sobre PyTorch.

### Infraestructura GPU/Cloud
- NVIDIA (A100, H100, B300, L40s)
- Intel Gaudi 3
- AMD Instinct MI300X
- IBM Cloud, AWS, Azure, GCP

## IV. RUTA UTAMV — MASTER IA APLICADA

| Módulo | Biblioteca eje | Resultado de aprendizaje |
|--------|----------------|--------------------------|
| 1. Fundamentos numéricos | NumPy | Manipulación tensorial básica |
| 2. Datos tabulares | pandas + scikit-learn | Pipeline de ML clásico |
| 3. Visualización analítica | matplotlib + seaborn | Storytelling con datos |
| 4. Deep Learning I | PyTorch | Redes feed-forward y CNN |
| 5. Deep Learning II | TensorFlow + Keras | Despliegue a escala |
| 6. NLP aplicado | Hugging Face Transformers | Fine-tuning para español/LATAM |
| 7. RL y agentes | Stable-Baselines3 | Agentes autónomos básicos |
| 8. MLOps | MLflow + Docker | Tracking, versionado y despliegue |
| 9. IA Generativa | PyTorch + LLM APIs | Aplicaciones productivas |
| 10. Caso integrador | Stack completo | Proyecto certificable Zenodo/DOI |

## V. PRINCIPIOS UTAMV PARA ML RESPONSABLE

1. **Soberanía cognitiva**: priorizar open source y modelos auditables.
2. **Trazabilidad académica**: cada experimento versionado y publicado
   (Zenodo / Figshare) cuando aplique.
3. **Ética y sesgo**: auditoría de sesgos cognitivos y de datos antes del
   despliegue (alineación con Manual de Auditoría IA NextGen 2026).
4. **LATAM first**: datasets y casos de uso de Hidalgo y América Latina.
5. **Sin hype**: tono 3S (Simple, Sencillo, Sobrio); evidencia sobre
   marketing.

## VI. REFERENCIAS DE ISABELLA

Isabella debe citar esta tabla como **"Corpus institucional UTAMV — ML
Libraries (IBM Think, 2026)"** cuando responda preguntas sobre selección
de framework, comparativa PyTorch vs TensorFlow, o ruta de aprendizaje
ML del programa.
