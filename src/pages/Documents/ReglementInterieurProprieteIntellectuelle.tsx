import { Card, CardContent } from '@shadcn/card';
import { Button } from '@shadcn/button';
import { Download } from 'lucide-react';
import { Helmet } from '@dr.pogodin/react-helmet';

const documentPath = encodeURI('/RÈGLEMENT INTÉRIEUR DE PROPRIÉTÉ INTELLECTUELLE.pdf');

const ReglementInterieurProprieteIntellectuelle = () => {
  return (
    <>
      <Helmet>
        <title>Règlement Intérieur de Propriété Intellectuelle | Inventor Portal</title>
        <meta property="og:title" content="Règlement Intérieur de Propriété Intellectuelle | Inventor Portal" />
      </Helmet>

      <Card className="w-full max-w-7xl mx-auto bg-[#b7c7d8] rounded-2xl shadow-lg">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#073567]">Règlement Intérieur de Propriété Intellectuelle</h1>
              <p className="text-[#073567] text-sm sm:text-base opacity-80 mt-1">Consultation du document PDF et téléchargement direct.</p>
            </div>
            <Button asChild className="bg-[#073567] text-white hover:bg-[#05294a] font-semibold">
              <a href={documentPath} download>
                <Download className="w-4 h-4 mr-2" />
                Télécharger le PDF
              </a>
            </Button>
          </div>

          <div className="w-full h-[70vh] rounded-xl overflow-hidden border border-[var(--primary)] bg-white">
            <iframe
              title="Règlement Intérieur de Propriété Intellectuelle"
              src={documentPath}
              className="w-full h-full"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ReglementInterieurProprieteIntellectuelle;