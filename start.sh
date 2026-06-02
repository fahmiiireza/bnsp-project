#!/bin/bash

# Pewarnaan teks untuk output terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================================${NC}"
echo -e "${BLUE}   Library Management System - Auto Setup & Runner    ${NC}"
echo -e "${BLUE}======================================================${NC}"

# 1. Pengecekan Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js belum terinstal. Silakan instal Node.js (v18+) terlebih dahulu.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Node.js terdeteksi ($(node -v)).${NC}"
fi

# 2. Pengecekan Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker belum terinstal. Sistem ini membutuhkan Docker untuk MySQL.${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Docker terdeteksi.${NC}"
fi

# 3. Memeriksa status Docker Daemon dan menyalakannya jika mati (Khusus Mac)
if ! docker info > /dev/null 2>&1; then
    echo -e "${BLUE}⏳ Docker Desktop sedang mati. Mencoba menyalakan Docker...${NC}"
    open -a Docker
    echo -n -e "${BLUE}⏳ Menunggu mesin Docker menyala (ini bisa memakan waktu)...${NC}"
    while ! docker info > /dev/null 2>&1; do
        sleep 2
        echo -n "."
    done
    echo ""
    echo -e "${GREEN}✅ Docker sudah berjalan dan siap!${NC}"
fi

# 4. Menyalakan Database MySQL
echo -e "${BLUE}🛢️ Menjalankan container database MySQL...${NC}"
cd backend
docker compose up -d

# 5. Instalasi Dependensi Backend
echo -e "${BLUE}📦 Memeriksa dependensi Backend...${NC}"
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}⏳ Menginstal dependensi Backend (npm install)...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Dependensi Backend sudah terinstal.${NC}"
fi
cd ..

# 6. Instalasi Dependensi Frontend
echo -e "${BLUE}📦 Memeriksa dependensi Frontend...${NC}"
cd frontend
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}⏳ Menginstal dependensi Frontend (npm install)...${NC}"
    npm install
else
    echo -e "${GREEN}✅ Dependensi Frontend sudah terinstal.${NC}"
fi
cd ..

echo -e "${BLUE}======================================================${NC}"
echo -e "${GREEN}🚀 Semua persiapan selesai! Menyalakan server...${NC}"
echo -e "   - ${BLUE}Backend${NC} berjalan di: ${GREEN}http://localhost:3000${NC}"
echo -e "   - ${BLUE}Frontend${NC} berjalan di: ${GREEN}http://localhost:3001${NC}"
echo -e "${RED}Tekan Ctrl+C untuk mematikan kedua server.${NC}"
echo -e "${BLUE}======================================================${NC}"

# Menjalankan backend di background
cd backend
npm run start:dev &
BACKEND_PID=$!

# Menjalankan frontend di background
cd ../frontend
npm run dev &
FRONTEND_PID=$!

# Fungsi untuk menangkap Ctrl+C dan mematikan kedua server secara rapi
cleanup() {
    echo -e "\n${RED}🛑 Mematikan server Backend dan Frontend...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}Server berhasil dimatikan. Sampai jumpa! 👋${NC}"
    exit 0
}

# Mendaftarkan fungsi cleanup saat user menekan Ctrl+C
trap cleanup SIGINT SIGTERM

# Menunggu proses selesai agar script tidak langsung tertutup
wait
