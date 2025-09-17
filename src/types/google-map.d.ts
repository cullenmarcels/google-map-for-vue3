// the position
export interface Position {
    lat: number
    lng: number
}

// Marker
export interface Marker {
    id: string
    position: Position
    label?: string
    draggable?: boolean
}

// Polyline
export interface PolylineOptions {
    path: Position[]
    strokeColor?: string
    strokeWeight?: number
}

// Circle
export interface CircleOptions {
    center: Position
    radius: number
    strokeColor?: string
    strokeWeight?: number
    fillColor?: string
    fillOpacity?: number
}