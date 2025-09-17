import Link from 'next/link';
import { promises as fs } from 'fs';
import path from 'path';

async function getPrivacyPolicy() {
  const filePath = path.join(process.cwd(), 'public', 'privacy_policy.md');
  const content = await fs.readFile(filePath, 'utf8');
  return content;
}

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPolicy();

  return (
    <div className="min-h-screen bg-tp-background">
      {/* Header */}
      <header className="tp-nav">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-tp-primary transition-colors text-tp-text-primary"
              >
                <i className="fas fa-arrow-left"></i>
                Back to TechPulse Daily
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="tp-card">
          <div className="p-8">
            <div className="text-tp-text-secondary leading-relaxed space-y-4">
              {content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold text-tp-text-primary mb-6">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-lg font-semibold text-tp-text-primary mt-6 mb-3">{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-base font-semibold text-tp-text-primary mt-4 mb-2">{line.substring(4)}</h3>;
                } else if (line.startsWith('- ')) {
                  return <div key={index} className="ml-4 mb-1 flex items-start"><span className="mr-2">•</span><span>{line.substring(2)}</span></div>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={index} className="font-semibold text-tp-text-primary">{line.slice(2, -2)}</p>;
                } else if (line.includes('**')) {
                  const parts = line.split('**');
                  return <p key={index}>{parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-tp-text-primary">{part}</strong> : part)}</p>;
                } else if (line.trim() === '') {
                  return <div key={index} className="h-2"></div>;
                } else {
                  return <p key={index}>{line}</p>;
                }
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}