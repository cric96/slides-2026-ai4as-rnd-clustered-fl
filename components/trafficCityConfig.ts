export type TrafficCluster = 'a' | 'b' | 'c'
export type TrafficDirection = 'east' | 'west' | 'north' | 'south'
export type VehicleTone = 'teal' | 'orange' | 'green' | 'plum'

export interface TrafficVehicle {
  direction: TrafficDirection
  duration: number
  delay: number
  track: number
  tone: VehicleTone
  kind: 'car' | 'van'
}

export interface TrafficSite {
  id: string
  camera: string
  name: string
  flow: string
  x: number
  y: number
  cluster: TrafficCluster
  vehicles: TrafficVehicle[]
}

const directions: TrafficDirection[] = ['east', 'west', 'north', 'south']
const tones: VehicleTone[] = ['teal', 'orange', 'green', 'plum']

function makeFleet(
  count: number,
  baseDuration: number,
  seed: number,
  preferredDirections: TrafficDirection[] = directions,
): TrafficVehicle[] {
  return Array.from({ length: count }, (_, index) => {
    const duration = baseDuration + ((index + seed) % 3) * 0.9
    return {
      direction: preferredDirections[(index + seed) % preferredDirections.length],
      duration,
      delay: -(((index * 1.73) + seed * 0.61) % duration),
      track: ((index + seed) % 3 - 1) * 0.16,
      tone: tones[(index * 2 + seed) % tones.length],
      kind: (index + seed) % 5 === 0 ? 'van' : 'car',
    }
  })
}

export const trafficSites: TrafficSite[] = [
  {
    id: 'centre',
    camera: 'CAM 01',
    name: 'CITY CENTRE',
    flow: 'dense rush hour',
    x: 17,
    y: 22,
    cluster: 'a',
    vehicles: makeFleet(9, 13.2, 1),
  },
  {
    id: 'school',
    camera: 'CAM 02',
    name: 'SCHOOL GATE',
    flow: 'stop-and-go queue',
    x: 50,
    y: 22,
    cluster: 'b',
    vehicles: makeFleet(8, 11.8, 2, ['east', 'west', 'east', 'west', 'south']),
  },
  {
    id: 'ring',
    camera: 'CAM 03',
    name: 'RING ROAD',
    flow: 'fast, sparse flow',
    x: 83,
    y: 22,
    cluster: 'c',
    vehicles: makeFleet(4, 5.2, 3, ['east', 'west']),
  },
  {
    id: 'stadium',
    camera: 'CAM 06',
    name: 'STADIUM',
    flow: 'event surge',
    x: 83,
    y: 78,
    cluster: 'a',
    vehicles: makeFleet(10, 9.4, 4),
  },
  {
    id: 'residential',
    camera: 'CAM 04',
    name: 'RESIDENTIAL',
    flow: 'steady local flow',
    x: 17,
    y: 78,
    cluster: 'b',
    vehicles: makeFleet(6, 10.8, 5, ['north', 'south', 'east']),
  },
  {
    id: 'arterial',
    camera: 'CAM 05',
    name: 'ARTERIAL',
    flow: 'fast through-traffic',
    x: 50,
    y: 78,
    cluster: 'c',
    vehicles: makeFleet(5, 5.9, 6, ['east', 'west', 'south']),
  },
]

export const clusterModels = [
  { cluster: 'a' as const, x: 17, y: 50, label: 'ωA' },
  { cluster: 'b' as const, x: 50, y: 50, label: 'ωB' },
  { cluster: 'c' as const, x: 83, y: 50, label: 'ωC' },
]

export const clusterPairs = clusterModels.map((model) => ({
  cluster: model.cluster,
  sites: trafficSites.filter((site) => site.cluster === model.cluster),
}))
