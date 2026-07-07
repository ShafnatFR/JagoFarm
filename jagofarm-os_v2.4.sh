#!/bin/bash
# ==============================================================================
# JagoFarm OS v2.4 - Smart Integrated Circular Farming Telemetry Daemon (DUMMY)
# ==============================================================================
# This script simulates a running IoT controller reporting sensor values 
# to the central Web Dashboard in real-time.

# Text styling
BOLD="\033[1m"
GREEN="\033[32m"
BLUE="\033[34m"
CYAN="\033[36m"
YELLOW="\033[33m"
RED="\033[31m"
MAGENTA="\033[35m"
RESET="\033[0m"

clear
echo -e "${CYAN}${BOLD}===============================================================${RESET}"
echo -e "${CYAN}${BOLD}       _                    ______                     ____  _____${RESET}"
echo -e "${CYAN}${BOLD}      | |                  |  ____|                   / __ \/ ____|${RESET}"
echo -e "${CYAN}${BOLD}      | | __ _  __ _  ___  | |__  __ _ _ __ _ __ ___ | |  | | (___  ${RESET}"
echo -e "${CYAN}${BOLD}  _   | |/ _\` |/ _\` |/ _ \ |  __|/ _\` | '__| '_ \` _ \| |  | |\___ \ ${RESET}"
echo -e "${CYAN}${BOLD} | |__| | (_| | (_| | (_) || |  | (_| | |  | | | | | | |__| |____) |${RESET}"
echo -e "${CYAN}${BOLD}  \____/ \__,_|\__, |\___/ |_|   \__,_|_|  |_| |_| |_|\____/|_____/ ${RESET}"
echo -e "${CYAN}${BOLD}                __/ |                                              ${RESET}"
echo -e "${CYAN}${BOLD}               |___/               v2.4 (Active IoT System)        ${RESET}"
echo -e "${CYAN}${BOLD}===============================================================${RESET}"
echo ""

echo -e "${BOLD}[SYSTEM]${RESET} Inisialisasi JagoFarm OS Core Daemon..."
sleep 0.5
echo -e "${BOLD}[SYSTEM]${RESET} Memuat konfigurasi jaringan dari .env ..."
sleep 0.4
echo -e "${BOLD}[SYSTEM]${RESET} Hub: ${GREEN}TERKONEKSI${RESET} ke central dashboard di Port 3000"
sleep 0.4

echo -e "\n${BOLD}[DIAGNOSTIK] Memeriksa Node Sensor Lapangan:${RESET}"
echo -e "  --> Node 1 [Bioflok DO & pH Meter]     : ${GREEN}${BOLD}AKTIF (OK)${RESET}"
echo -e "  --> Node 2 [Greenhouse Temp & Humidity]: ${GREEN}${BOLD}AKTIF (OK)${RESET}"
echo -e "  --> Node 3 [AutoFeeder Actuator]       : ${GREEN}${BOLD}STANDBY (OK)${RESET}"
echo -e "  --> Node 4 [BSF Maggot Bin Thermo]     : ${GREEN}${BOLD}AKTIF (OK)${RESET}"
sleep 0.8

echo -e "\n${GREEN}${BOLD}[STATUS] JagoFarm OS berjalan aktif dalam background mode (PID: $$).${RESET}"
echo -e "${YELLOW}Menyiapkan transmisi data telemetry (Ctrl+C untuk keluar)...${RESET}\n"
sleep 1

# Telemetry simulation loop
step=1
while true; do
  timestamp=$(date +"%Y-%m-%d %H:%M:%S")
  
  # Simulate normal variation in sensor values
  rand_do=$(awk -v min=5.8 -v max=6.7 'BEGIN{srand(); print min+rand()*(max-min)}')
  rand_ph=$(awk -v min=7.15 -v max=7.45 'BEGIN{srand(); print min+rand()*(max-min)}')
  rand_temp_water=$(awk -v min=26.4 -v max=27.8 'BEGIN{srand(); print min+rand()*(max-min)}')
  rand_temp_gh=$(awk -v min=28.1 -v max=31.4 'BEGIN{srand(); print min+rand()*(max-min)}')
  
  # Deciding fan state based on greenhouse temp
  fan_status="${GREEN}OFF (Auto)${RESET}"
  if (( $(echo "$rand_temp_gh > 30.0" | bc -l) )); then
    fan_status="${CYAN}${BOLD}ON (Auto/Cooling)${RESET}"
  fi

  echo -e "${BLUE}[$timestamp] Transmisi Telemetri #${step}:${RESET}"
  echo -e "  ├─ Oksigen Terlarut (DO) : ${BOLD}${rand_do:0:4} mg/L${RESET} [Optimal]"
  echo -e "  ├─ Derajat Keasaman (pH) : ${BOLD}${rand_ph:0:4}${RESET} [Stabil]"
  echo -e "  ├─ Suhu Air Kolam Bioflok: ${BOLD}${rand_temp_water:0:4} °C${RESET}"
  echo -e "  ├─ Suhu Udara Greenhouse : ${BOLD}${rand_temp_gh:0:4} °C${RESET}"
  echo -e "  ├─ Exhaust Fan Status    : $fan_status"
  echo -e "  └─ AutoFeeder Dispenser  : ${GREEN}STANDBY${RESET}"
  echo -e "${CYAN}---------------------------------------------------------------${RESET}"
  
  step=$((step + 1))
  sleep 4
done
