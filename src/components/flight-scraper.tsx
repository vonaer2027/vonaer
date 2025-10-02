'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Play, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ScrapingResult {
  success: boolean;
  results?: {
    totalFlights: number;
    uploaded: number;
    skipped: number;
    errors: number;
    flights: Array<{
      id: string;
      extractedData: {
        price: string;
        date: string;
        aircraft: string;
        route: {
          summary: string;
        };
      };
    }>;
  };
  error?: string;
  details?: string;
}

export function FlightScraper() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScrapingResult | null>(null);
  const [lastRun, setLastRun] = useState<Date | null>(null);

  const handleScrape = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const response = await fetch('/api/scrape-flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data: ScrapingResult = await response.json();
      setResult(data);
      setLastRun(new Date());
      
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to connect to scraping service',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (result?.success) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (result && !result.success) return <XCircle className="h-4 w-4 text-red-500" />;
    return <Clock className="h-4 w-4 text-gray-400" />;
  };

  const getStatusText = () => {
    if (isLoading) return 'Scraping in progress...';
    if (result?.success) return 'Scraping completed successfully';
    if (result && !result.success) return 'Scraping failed';
    return 'Ready to scrape';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon()}
          Flight Scraper
        </CardTitle>
        <CardDescription>
          Scrape flight data from Jet-Bay and upload to Supabase database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">{getStatusText()}</p>
            {lastRun && (
              <p className="text-xs text-muted-foreground">
                Last run: {lastRun.toLocaleString()}
              </p>
            )}
          </div>
          <Button 
            onClick={handleScrape} 
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {isLoading ? 'Scraping...' : 'Start Scraping'}
          </Button>
        </div>

        {result && (
          <div className="space-y-3 pt-4 border-t">
            <h4 className="font-medium">Results</h4>
            
            {result.success && result.results ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <div className="text-lg font-bold text-blue-600">
                      {result.results.totalFlights}
                    </div>
                    <div className="text-xs text-blue-600">Total Found</div>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <div className="text-lg font-bold text-green-600">
                      {result.results.uploaded}
                    </div>
                    <div className="text-xs text-green-600">Uploaded</div>
                  </div>
                  <div className="text-center p-2 bg-yellow-50 rounded">
                    <div className="text-lg font-bold text-yellow-600">
                      {result.results.skipped}
                    </div>
                    <div className="text-xs text-yellow-600">Skipped</div>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded">
                    <div className="text-lg font-bold text-red-600">
                      {result.results.errors}
                    </div>
                    <div className="text-xs text-red-600">Errors</div>
                  </div>
                </div>

                {result.results.flights.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Sample Flights:</h5>
                    {result.results.flights.map((flight, index) => (
                      <div key={flight.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                        <div>
                          <span className="font-medium">{flight.extractedData.route.summary}</span>
                          <Badge variant="outline" className="ml-2">
                            {flight.extractedData.aircraft}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">
                            {flight.extractedData.price}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {flight.extractedData.date}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-800 font-medium">
                  {result.error || 'Scraping failed'}
                </p>
                {result.details && (
                  <p className="text-xs text-red-600 mt-1">
                    {result.details}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground pt-2 border-t">
          <p>• This process may take 2-5 minutes to complete</p>
          <p>• Scrapes Korea-related flights from Jet-Bay</p>
          <p>• Automatically prevents duplicate entries</p>
        </div>
      </CardContent>
    </Card>
  );
}

