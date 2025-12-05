import React from 'react';

export enum Screen {
  WELCOME = 'WELCOME',
  DASHBOARD = 'DASHBOARD',
  SCANNER = 'SCANNER',
  CHAT = 'CHAT'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  image?: string; // base64 data for scanner
}

export interface Feature {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
  color: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}