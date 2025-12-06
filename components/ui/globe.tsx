'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { feature } from 'topojson-client'

export function World() {
  const containerRef = useRef<HTMLDivElement>(null)
  const labelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene / camera / renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 3)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    container.appendChild(renderer.domElement)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0)
    dirLight.position.set(5, 3, 5)
    scene.add(dirLight)

    // Group so pins & globe rotate together
    const globeGroup = new THREE.Group()
    globeGroup.scale.set(0.9, 0.9, 0.9)
    scene.add(globeGroup)

    const RADIUS = 1

    // Globe mesh (pitch black sphere with country outlines)
    const globeGeometry = new THREE.SphereGeometry(RADIUS, 64, 64)
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      specular: 0x111111,
      shininess: 5,
    })
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial)
    globeGroup.add(globeMesh)

    // Add country outlines
    fetch('https://unpkg.com/world-atlas@2/countries-110m.json')
      .then((res) => res.json())
      .then((worldData) => {
        const countries = worldData.objects.countries
        const geojson = feature(worldData, countries) as any

        geojson.features.forEach((country: any) => {
          if (country.geometry.type === 'Polygon') {
            drawCountryOutline(country.geometry.coordinates)
          } else if (country.geometry.type === 'MultiPolygon') {
            country.geometry.coordinates.forEach((polygon: any) => {
              drawCountryOutline(polygon)
            })
          }
        })
      })
      .catch((err) => {
        console.log('Could not load country outlines:', err)
      })

    function drawCountryOutline(coordinates: any) {
      const points: THREE.Vector3[] = []

      coordinates[0].forEach((coord: number[]) => {
        const [lng, lat] = coord
        const pos = latLngToVector3(lat, lng, RADIUS, 0.005)
        points.push(pos)
      })

      if (points.length > 1) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00d9ff,
          opacity: 0.6,
          transparent: true,
        })
        const line = new THREE.Line(lineGeometry, lineMaterial)
        globeGroup.add(line)
      }
    }

    // Helper: lat/lng -> 3D position on sphere
    function latLngToVector3(lat: number, lng: number, radius: number, altitude = 0) {
      const phi = (90 - lat) * (Math.PI / 180)
      const theta = (lng + 180) * (Math.PI / 180)

      const r = radius + altitude
      const x = -r * Math.sin(phi) * Math.cos(theta)
      const z = r * Math.sin(phi) * Math.sin(theta)
      const y = r * Math.cos(phi)

      return new THREE.Vector3(x, y, z)
    }

    // Pins
    const pinMaterial = new THREE.MeshBasicMaterial({ color: 0x00e5ff })
    const pins: Array<{ mesh: THREE.Mesh; label: string; lat: number; lng: number }> = []

    function addPin(lat: number, lng: number, label: string) {
      const pinGeom = new THREE.SphereGeometry(0.02, 16, 16)
      const pinMesh = new THREE.Mesh(pinGeom, pinMaterial)

      const pos = latLngToVector3(lat, lng, RADIUS, 0.03)
      pinMesh.position.copy(pos)

      // Glowing halo
      const haloGeom = new THREE.SphereGeometry(0.05, 16, 16)
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.25,
      })
      const halo = new THREE.Mesh(haloGeom, haloMat)
      halo.position.copy(pos)

      globeGroup.add(pinMesh)
      globeGroup.add(halo)

      pinMesh.userData.label = label
      pinMesh.userData.lat = lat
      pinMesh.userData.lng = lng
      pins.push({ mesh: pinMesh, label, lat, lng })
    }

    // Add pins
    addPin(37.7749, -122.4194, 'San Francisco')
    addPin(40.7128, -74.0060, 'New York')
    addPin(51.5074, -0.1278, 'London')
    addPin(48.8566, 2.3522, 'Paris')
    addPin(52.5200, 13.4050, 'Berlin')
    addPin(35.6895, 139.6917, 'Tokyo')
    addPin(1.3521, 103.8198, 'Singapore')
    addPin(-33.8688, 151.2093, 'Sydney')
    addPin(-37.8136, 144.9631, 'Melbourne')
    addPin(19.4326, -99.1332, 'Mexico City')
    addPin(-23.5505, -46.6333, 'São Paulo')
    addPin(55.7558, 37.6173, 'Moscow')
    addPin(28.6139, 77.2090, 'New Delhi')
    addPin(19.0760, 72.8777, 'Mumbai')
    addPin(12.9716, 77.5946, 'Bangalore')
    addPin(25.2048, 55.2708, 'Dubai')
    addPin(23.8103, 90.4125, 'Dhaka')
    addPin(22.3193, 114.1694, 'Hong Kong')
    addPin(-1.2921, 36.8219, 'Nairobi')
    addPin(43.6532, -79.3832, 'Toronto')
    addPin(49.2827, -123.1207, 'Vancouver')

    // Animation loop
    let lastTime = 0
    const rotationSpeed = 0.15
    const activeLabels = new Map<string, { element: HTMLDivElement; startTime: number }>()

    function typeText(element: HTMLDivElement, text: string, startTime: number, currentTime: number) {
      const elapsed = currentTime - startTime
      const charsPerSecond = 20
      const charIndex = Math.floor(elapsed / 1000 * charsPerSecond)
      const displayText = text.substring(0, Math.min(charIndex, text.length))
      element.textContent = displayText
    }

    function animate(time: number) {
      requestAnimationFrame(animate)

      const delta = (time - lastTime) / 1000
      lastTime = time

      globeGroup.rotation.y += rotationSpeed * delta

      // Update labels based on pin visibility
      if (labelsRef.current) {
        pins.forEach((pin) => {
          // Get world position of pin
          const worldPos = new THREE.Vector3()
          pin.mesh.getWorldPosition(worldPos)

          // Check if pin is facing camera (visible on front side of globe)
          const cameraDir = new THREE.Vector3()
          camera.getWorldDirection(cameraDir)

          const pinDir = worldPos.clone().normalize()
          const dotProduct = pinDir.dot(cameraDir.multiplyScalar(-1))

          const isVisible = dotProduct > 0.3 // Threshold for visibility

          if (isVisible) {
            // Project 3D position to 2D screen coordinates
            const screenPos = worldPos.clone().project(camera)
            const x = (screenPos.x * 0.5 + 0.5) * width
            const y = (-(screenPos.y * 0.5) + 0.5) * height

            if (!activeLabels.has(pin.label)) {
              // Create new label
              const labelDiv = document.createElement('div')
              labelDiv.style.position = 'absolute'
              labelDiv.style.color = '#ff5722'
              labelDiv.style.fontSize = '16px'
              labelDiv.style.fontWeight = '600'
              labelDiv.style.pointerEvents = 'none'
              labelDiv.style.whiteSpace = 'nowrap'
              labelDiv.style.textShadow = '0 0 10px rgba(255, 87, 34, 0.5)'
              labelsRef.current!.appendChild(labelDiv)
              activeLabels.set(pin.label, { element: labelDiv, startTime: time })
            }

            const labelData = activeLabels.get(pin.label)!
            typeText(labelData.element, pin.label, labelData.startTime, time)
            labelData.element.style.left = `${x + 20}px`
            labelData.element.style.top = `${y - 10}px`
          } else {
            // Remove label if exists
            if (activeLabels.has(pin.label)) {
              const labelData = activeLabels.get(pin.label)!
              labelsRef.current!.removeChild(labelData.element)
              activeLabels.delete(pin.label)
            }
          }
        })
      }

      renderer.render(scene, camera)
    }

    animate(0)

    // Handle resize
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      // Clear all labels
      activeLabels.forEach((labelData) => {
        if (labelsRef.current) {
          labelsRef.current.removeChild(labelData.element)
        }
      })
      activeLabels.clear()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center">
      <style>{`
        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          0%, 100% {
            border-color: #00d9ff;
          }
          50% {
            border-color: transparent;
          }
        }

        @keyframes removeCursor {
          to {
            border-color: transparent;
          }
        }

        .typewriter-text {
          overflow: hidden;
          border-right: 3px solid #00d9ff;
          white-space: nowrap;
          margin: 0 auto;
          animation:
            typewriter 4s steps(40, end) forwards,
            blink 0.75s step-end 0s 5,
            removeCursor 0s 4s forwards;
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          text-shadow: 0 0 20px rgba(0, 217, 255, 0.8);
          letter-spacing: 1px;
        }
      `}</style>

      <div ref={containerRef} className="w-full h-full" />
      <div ref={labelsRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="typewriter-text">
          We build for startups around the world
        </div>
      </div>
    </div>
  )
}
