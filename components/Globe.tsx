'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Globe() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 3

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    containerRef.current.appendChild(renderer.domElement)

    // Create wireframe globe
    const geometry = new THREE.SphereGeometry(1, 32, 32)
    const wireframe = new THREE.WireframeGeometry(geometry)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d9ff,
      transparent: true,
      opacity: 0.3,
    })
    const globe = new THREE.LineSegments(wireframe, lineMaterial)
    scene.add(globe)

    // Add glowing particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 1 + Math.random() * 0.1

      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      posArray[i * 3 + 2] = radius * Math.cos(phi)
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.8,
    })
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      globe.rotation.y += 0.002
      globe.rotation.x += 0.001
      particlesMesh.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      wireframe.dispose()
      lineMaterial.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-full" />
}
