import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}

export const codeSnippets = [
  'const ai = new LLM({ model: "claude" })',
  'await embeddings.similarity(query)',
  'def train_model(X, y):',
  'SELECT * FROM insights WHERE iq > 100',
  'npm run build && deploy()',
  'git commit -m "feat: add RAG pipeline"',
  'torch.nn.Linear(512, 256)',
  'pipeline = LlamaIndex.RAG()',
  '<Component animate={{ opacity: 1 }}/>',
  'const [state, setState] = useState()',
  'async function* streamResponse()',
  'supabase.from("users").select("*")',
  'model.fit(X_train, y_train)',
  'FastAPI().include_router(router)',
  'docker build -t myapp .',
  'kubectl apply -f deployment.yaml',
]
