import * as React from "react";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { GoogleMap, Circle, useJsApiLoader } from '@react-google-maps/api';

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; radius: number; address: string }) => void;
}

const defaultCenter = {
  lat: 3.139003,
  lng: 101.686855
};

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  border: '1px solid #ccc'
};

const API_KEY = 'AIzaSyCOg8Vuwb0qHstWs9p-it_hc1GdB_EoA9Y';

export function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [radius, setRadius] = React.useState(5000);
  const [center, setCenter] = React.useState(defaultCenter);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const { isLoaded, loadError: jsApiLoadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    version: "weekly"
  });

  const geocoder = React.useMemo(() => isLoaded ? new google.maps.Geocoder() : null, [isLoaded]);

  const getAddressFromLatLng = async (lat: number, lng: number) => {
    if (!geocoder) return '';
    
    try {
      const response = await geocoder.geocode({
        location: { lat, lng }
      });
      
      if (response.results[0]) {
        let city = '';
        let state = '';
        
        for (const component of response.results[0].address_components) {
          if (component.types.includes('locality')) {
            city = component.short_name;
          } else if (component.types.includes('administrative_area_level_1')) {
            state = component.short_name;
          }
        }
        
        return city && state ? `${city}, ${state}` : response.results[0].formatted_address;
      }
      return '';
    } catch (error) {
      console.error('Geocoding error:', error);
      return '';
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(newCenter);
          
          if (map) {
            map.panTo(newCenter);
            map.setZoom(15);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoadError('Failed to get current location: ' + error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setLoadError('Geolocation is not supported by your browser');
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newCenter = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      setCenter(newCenter);
    }
  };

  const handleSave = async () => {
    const address = await getAddressFromLatLng(center.lat, center.lng);
    onLocationSelect({
      ...center,
      radius: radius / 1000,
      address
    });
    setDialogOpen(false);
  };

  const circleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    zIndex: 1
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <MapPin className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Location</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            {loadError ? (
              <div className="text-red-500 p-4 text-center border rounded">
                {loadError}
                <br />
                <small>Check console for details</small>
              </div>
            ) : !isLoaded ? (
              <div className="text-center p-4 border rounded">Loading map...</div>
            ) : (
              <div className="border rounded overflow-hidden">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={12}
                  onClick={handleMapClick}
                  onLoad={setMap}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                    zoomControl: true
                  }}
                >
                  <Circle
                    center={center}
                    radius={radius}
                    options={circleOptions}
                  />
                </GoogleMap>
              </div>
            )}
            <Button onClick={handleGetCurrentLocation} className="bg-blue-500 hover:bg-blue-600">
              Get Current Location
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Radius (km): {(radius / 1000).toFixed(1)}</label>
            <Slider
              value={[radius]}
              onValueChange={(value) => setRadius(value[0])}
              min={1000}
              max={50000}
              step={100}
            />
          </div>
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
            Save Location
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}