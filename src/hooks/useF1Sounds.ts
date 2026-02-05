 // Hook pour les effets sonores F1 du module Pourcentages
 import { useCallback, useRef } from 'react';
 
 export const useF1Sounds = () => {
   const audioContextRef = useRef<AudioContext | null>(null);
 
   const getAudioContext = useCallback(() => {
     if (!audioContextRef.current) {
       audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
     }
     return audioContextRef.current;
   }, []);
 
   // Son de vrombissement moteur au départ
   const playEngineStart = useCallback(() => {
     try {
       const ctx = getAudioContext();
       const now = ctx.currentTime;
 
       // Oscillateur principal (moteur)
       const osc1 = ctx.createOscillator();
       const osc2 = ctx.createOscillator();
       const gainNode = ctx.createGain();
       const filter = ctx.createBiquadFilter();
 
       // Configuration du filtre
       filter.type = 'lowpass';
       filter.frequency.setValueAtTime(200, now);
       filter.frequency.exponentialRampToValueAtTime(2000, now + 1.5);
 
       // Oscillateur 1 - son grave
       osc1.type = 'sawtooth';
       osc1.frequency.setValueAtTime(60, now);
       osc1.frequency.exponentialRampToValueAtTime(150, now + 0.8);
       osc1.frequency.exponentialRampToValueAtTime(200, now + 1.5);
 
       // Oscillateur 2 - harmoniques
       osc2.type = 'square';
       osc2.frequency.setValueAtTime(120, now);
       osc2.frequency.exponentialRampToValueAtTime(300, now + 0.8);
       osc2.frequency.exponentialRampToValueAtTime(400, now + 1.5);
 
       // Envelope du volume
       gainNode.gain.setValueAtTime(0, now);
       gainNode.gain.linearRampToValueAtTime(0.15, now + 0.1);
       gainNode.gain.linearRampToValueAtTime(0.25, now + 0.8);
       gainNode.gain.linearRampToValueAtTime(0.1, now + 1.5);
       gainNode.gain.linearRampToValueAtTime(0, now + 2);
 
       // Connexions
       osc1.connect(filter);
       osc2.connect(filter);
       filter.connect(gainNode);
       gainNode.connect(ctx.destination);
 
       osc1.start(now);
       osc2.start(now);
       osc1.stop(now + 2);
       osc2.stop(now + 2);
     } catch (e) {
       console.log('Audio not supported');
     }
   }, [getAudioContext]);
 
   // Bip de validation (réponse correcte)
   const playSuccessBeep = useCallback(() => {
     try {
       const ctx = getAudioContext();
       const now = ctx.currentTime;
 
       // Double bip ascendant
       [0, 0.15].forEach((delay, i) => {
         const osc = ctx.createOscillator();
         const gainNode = ctx.createGain();
 
         osc.type = 'sine';
         osc.frequency.setValueAtTime(i === 0 ? 880 : 1320, now + delay);
 
         gainNode.gain.setValueAtTime(0, now + delay);
         gainNode.gain.linearRampToValueAtTime(0.3, now + delay + 0.02);
         gainNode.gain.linearRampToValueAtTime(0, now + delay + 0.12);
 
         osc.connect(gainNode);
         gainNode.connect(ctx.destination);
 
         osc.start(now + delay);
         osc.stop(now + delay + 0.15);
       });
     } catch (e) {
       console.log('Audio not supported');
     }
   }, [getAudioContext]);
 
   // Son de sortie de piste (erreur)
   const playOffTrack = useCallback(() => {
     try {
       const ctx = getAudioContext();
       const now = ctx.currentTime;
 
       // Bruit de dérapage + klaxon d'erreur
       const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
       const noiseData = noiseBuffer.getChannelData(0);
       for (let i = 0; i < noiseData.length; i++) {
         noiseData[i] = Math.random() * 2 - 1;
       }
 
       const noiseSource = ctx.createBufferSource();
       noiseSource.buffer = noiseBuffer;
 
       const noiseFilter = ctx.createBiquadFilter();
       noiseFilter.type = 'bandpass';
       noiseFilter.frequency.setValueAtTime(1000, now);
       noiseFilter.Q.setValueAtTime(5, now);
 
       const noiseGain = ctx.createGain();
       noiseGain.gain.setValueAtTime(0.2, now);
       noiseGain.gain.linearRampToValueAtTime(0, now + 0.4);
 
       noiseSource.connect(noiseFilter);
       noiseFilter.connect(noiseGain);
       noiseGain.connect(ctx.destination);
 
       // Klaxon d'erreur grave
       const errorOsc = ctx.createOscillator();
       const errorGain = ctx.createGain();
 
       errorOsc.type = 'sawtooth';
       errorOsc.frequency.setValueAtTime(150, now);
       errorOsc.frequency.linearRampToValueAtTime(100, now + 0.3);
 
       errorGain.gain.setValueAtTime(0.2, now);
       errorGain.gain.linearRampToValueAtTime(0, now + 0.4);
 
       errorOsc.connect(errorGain);
       errorGain.connect(ctx.destination);
 
       noiseSource.start(now);
       errorOsc.start(now);
       noiseSource.stop(now + 0.5);
       errorOsc.stop(now + 0.5);
     } catch (e) {
       console.log('Audio not supported');
     }
   }, [getAudioContext]);
 
   // Son de passage de niveau / checkpoint
   const playCheckpoint = useCallback(() => {
     try {
       const ctx = getAudioContext();
       const now = ctx.currentTime;
 
       // Accord ascendant rapide
       [0, 0.08, 0.16].forEach((delay, i) => {
         const osc = ctx.createOscillator();
         const gainNode = ctx.createGain();
 
         osc.type = 'sine';
         const freqs = [523.25, 659.25, 783.99]; // Do, Mi, Sol
         osc.frequency.setValueAtTime(freqs[i], now + delay);
 
         gainNode.gain.setValueAtTime(0, now + delay);
         gainNode.gain.linearRampToValueAtTime(0.25, now + delay + 0.02);
         gainNode.gain.linearRampToValueAtTime(0.15, now + delay + 0.1);
         gainNode.gain.linearRampToValueAtTime(0, now + delay + 0.25);
 
         osc.connect(gainNode);
         gainNode.connect(ctx.destination);
 
         osc.start(now + delay);
         osc.stop(now + delay + 0.3);
       });
     } catch (e) {
       console.log('Audio not supported');
     }
   }, [getAudioContext]);
 
   return {
     playEngineStart,
     playSuccessBeep,
     playOffTrack,
     playCheckpoint,
   };
 };