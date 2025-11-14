import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Wind, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from './ui/progress';

export default function AirQualityMap() {
  const aqiZones = [
    { name: 'Whitefield', aqi: 105, level: 'Unhealthy for Sensitive Groups', pm25: 45, pm10: 95, color: 'orange', lat: '12.9698', lon: '77.7500' },
    { name: 'Koramangala', aqi: 78, level: 'Moderate', pm25: 32, pm10: 68, color: 'yellow', lat: '12.9352', lon: '77.6245' },
    { name: 'Indiranagar', aqi: 92, level: 'Moderate', pm25: 38, pm10: 82, color: 'yellow', lat: '12.9716', lon: '77.6412' },
    { name: 'Electronic City', aqi: 118, level: 'Unhealthy for Sensitive Groups', pm25: 52, pm10: 108, color: 'orange', lat: '12.8456', lon: '77.6603' },
    { name: 'Jayanagar', aqi: 65, level: 'Moderate', pm25: 25, pm10: 58, color: 'yellow', lat: '12.9250', lon: '77.5838' },
    { name: 'Malleshwaram', aqi: 72, level: 'Moderate', pm25: 28, pm10: 64, color: 'yellow', lat: '13.0039', lon: '77.5712' },
    { name: 'HSR Layout', aqi: 88, level: 'Moderate', pm25: 36, pm10: 78, color: 'yellow', lat: '12.9082', lon: '77.6476' },
    { name: 'Hebbal', aqi: 95, level: 'Moderate', pm25: 40, pm10: 85, color: 'yellow', lat: '13.0358', lon: '77.5970' }
  ];

  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    return 'bg-purple-500';
  };

  const getAQITextColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-600';
    if (aqi <= 100) return 'text-yellow-600';
    if (aqi <= 150) return 'text-orange-600';
    if (aqi <= 200) return 'text-red-600';
    return 'text-purple-600';
  };

  const pollutants = [
    { name: 'PM2.5', value: 38, unit: 'µg/m³', status: 'Moderate', trend: 'up' },
    { name: 'PM10', value: 82, unit: 'µg/m³', status: 'Moderate', trend: 'down' },
    { name: 'NO₂', value: 42, unit: 'ppb', status: 'Good', trend: 'down' },
    { name: 'O₃', value: 28, unit: 'ppb', status: 'Good', trend: 'up' },
    { name: 'SO₂', value: 12, unit: 'ppb', status: 'Good', trend: 'down' },
    { name: 'CO', value: 0.6, unit: 'ppm', status: 'Good', trend: 'down' }
  ];

  return (
    <div className="space-y-6">
      {/* Main AQI Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="w-5 h-5" />
                Air Quality Index - Bengaluru
              </CardTitle>
              <CardDescription>Real-time air quality monitoring across city zones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden">
                {/* Map Grid */}
                <div className="absolute inset-0 opacity-10">
                  <div className="grid grid-cols-8 grid-rows-8 h-full">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div key={i} className="border border-gray-400" />
                    ))}
                  </div>
                </div>

                {/* AQI Zones */}
                {aqiZones.map((zone, index) => {
                  const positions = [
                    { top: '30%', left: '70%' }, // Whitefield
                    { top: '55%', left: '55%' }, // Koramangala
                    { top: '40%', left: '60%' }, // Indiranagar
                    { top: '80%', left: '65%' }, // Electronic City
                    { top: '65%', left: '40%' }, // Jayanagar
                    { top: '20%', left: '45%' }, // Malleshwaram
                    { top: '60%', left: '65%' }, // HSR
                    { top: '15%', left: '50%' }  // Hebbal
                  ];

                  return (
                    <div
                      key={index}
                      className="absolute group cursor-pointer"
                      style={{ top: positions[index].top, left: positions[index].left }}
                    >
                      {/* AQI Circle with Gradient */}
                      <div className={`w-24 h-24 ${getAQIColor(zone.aqi)} opacity-20 rounded-full blur-2xl`} />
                      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 ${getAQIColor(zone.aqi)} opacity-60 rounded-full flex items-center justify-center text-white`}>
                        {zone.aqi}
                      </div>

                      {/* Tooltip */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-3 rounded-lg shadow-xl w-48 z-10">
                        <p className="text-sm mb-1">{zone.name}</p>
                        <p className={`text-xs ${getAQITextColor(zone.aqi)} mb-2`}>{zone.level}</p>
                        <div className="text-xs space-y-1 text-gray-600">
                          <div className="flex justify-between">
                            <span>PM2.5:</span>
                            <span>{zone.pm25} µg/m³</span>
                          </div>
                          <div className="flex justify-between">
                            <span>PM10:</span>
                            <span>{zone.pm10} µg/m³</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
                  <p className="text-sm mb-3">Air Quality Index</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded" />
                      <span className="text-xs">Good (0-50)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-yellow-500 rounded" />
                      <span className="text-xs">Moderate (51-100)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-orange-500 rounded" />
                      <span className="text-xs">Unhealthy (101-150)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded" />
                      <span className="text-xs">Very Unhealthy (151-200)</span>
                    </div>
                  </div>
                </div>

                {/* Current Time */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-xs text-gray-500">Last Updated</p>
                  <p className="text-sm">2 mins ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Overall AQI */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">City Average AQI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-5xl ${getAQITextColor(87)}`}>87</div>
                <p className="text-sm text-gray-600">Moderate</p>
                <div className="flex items-center justify-center gap-2 text-sm text-orange-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+5 from yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Health Advisory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <p className="text-gray-600">Current conditions are acceptable for most people.</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Sensitive groups should limit prolonged outdoor activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Consider wearing masks in high-traffic areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span>Use air purifiers indoors if available</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Best & Worst Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Zone Comparison</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-2">Best Air Quality</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Jayanagar</span>
                  <span className="text-green-600">65</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">Needs Attention</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Electronic City</span>
                  <span className="text-orange-600">118</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pollutants Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Pollutants Breakdown</CardTitle>
          <CardDescription>Individual pollutant levels across the city</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pollutants.map((pollutant, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm">{pollutant.name}</p>
                    <p className="text-xs text-gray-500">{pollutant.status}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {pollutant.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-2xl">{pollutant.value}</span>
                    <span className="text-xs text-gray-500">{pollutant.unit}</span>
                  </div>
                  <Progress value={(pollutant.value / (pollutant.name.includes('PM') ? 150 : 100)) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Trends */}
      <Card>
        <CardHeader>
          <CardTitle>7-Day AQI Trend</CardTitle>
          <CardDescription>Average daily air quality index</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-48 gap-2">
            {[82, 78, 85, 92, 88, 90, 87].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className={`w-full ${getAQIColor(value)} rounded-t transition-all hover:opacity-80`}
                  style={{ height: `${(value / 120) * 100}%` }}
                />
                <div className="text-center">
                  <p className="text-sm">{value}</p>
                  <p className="text-xs text-gray-500">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
