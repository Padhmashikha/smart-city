import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { MapPin, Navigation, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';

export default function TrafficMap() {
  const trafficData = [
    { 
      location: 'Outer Ring Road - Silk Board', 
      status: 'Heavy', 
      delay: '25 mins', 
      severity: 'high',
      coordinates: '12.9165, 77.6221',
      incidents: 2
    },
    { 
      location: 'MG Road - Trinity Junction', 
      status: 'Moderate', 
      delay: '12 mins', 
      severity: 'medium',
      coordinates: '12.9756, 77.6063',
      incidents: 0
    },
    { 
      location: 'Hebbal Flyover', 
      status: 'Heavy', 
      delay: '18 mins', 
      severity: 'high',
      coordinates: '13.0358, 77.5970',
      incidents: 1
    },
    { 
      location: 'Electronic City Flyover', 
      status: 'Light', 
      delay: '5 mins', 
      severity: 'low',
      coordinates: '12.8456, 77.6603',
      incidents: 0
    },
    { 
      location: 'Marathahalli Bridge', 
      status: 'Moderate', 
      delay: '10 mins', 
      severity: 'medium',
      coordinates: '12.9591, 77.6974',
      incidents: 0
    },
    { 
      location: 'Bannerghatta Road', 
      status: 'Heavy', 
      delay: '20 mins', 
      severity: 'high',
      coordinates: '12.8881, 77.5970',
      incidents: 1
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Heavy': return 'bg-red-100 text-red-700 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Light': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Placeholder */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Live Traffic Heatmap
            </CardTitle>
            <CardDescription>Real-time traffic density across Bengaluru</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Interactive Map Visualization */}
            <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
              {/* Map Background with Grid */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-8 h-full">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div key={i} className="border border-gray-300" />
                  ))}
                </div>
              </div>

              {/* Traffic Points */}
              {trafficData.map((point, index) => {
                const positions = [
                  { top: '60%', left: '45%' }, // Silk Board
                  { top: '40%', left: '55%' }, // MG Road
                  { top: '20%', left: '50%' }, // Hebbal
                  { top: '75%', left: '60%' }, // Electronic City
                  { top: '35%', left: '70%' }, // Marathahalli
                  { top: '70%', left: '35%' }  // Bannerghatta
                ];
                return (
                  <div
                    key={index}
                    className="absolute animate-pulse"
                    style={{ top: positions[index].top, left: positions[index].left }}
                  >
                    <div className={`w-16 h-16 ${getSeverityColor(point.severity)} opacity-30 rounded-full blur-xl`} />
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 ${getSeverityColor(point.severity)} rounded-full`} />
                    {point.incidents > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {point.incidents}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-sm mb-2">Traffic Density</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span className="text-xs">Light</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                    <span className="text-xs">Moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-xs">Heavy</span>
                  </div>
                </div>
              </div>

              {/* City Label */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <p className="text-sm">Bengaluru City Center</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Details Sidebar */}
      <div className="space-y-6">
        {/* Current Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Speed</span>
              <span className="text-lg">24 km/h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Incidents</span>
              <span className="text-lg text-red-600">4</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Road Closures</span>
              <span className="text-lg">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Peak Hour</span>
              <span className="text-lg">Yes</span>
            </div>
          </CardContent>
        </Card>

        {/* Live Traffic Updates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Live Traffic Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficData.map((point, index) => (
                <div key={index} className="space-y-2 pb-4 border-b last:border-b-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{point.location}</p>
                        <p className="text-xs text-gray-500">{point.coordinates}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusBadge(point.status)} text-xs flex-shrink-0`}>
                      {point.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 ml-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {point.delay}
                    </div>
                    {point.incidents > 0 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        {point.incidents} incident{point.incidents > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Next Hour Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">Expected traffic conditions in the next 60 minutes:</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Overall Traffic</span>
                <span className="text-orange-600">Increasing</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Best Route</span>
                <span className="text-green-600">Hosur Road</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Avoid</span>
                <span className="text-red-600">ORR South</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
