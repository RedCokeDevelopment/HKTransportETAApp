export interface MTRStation {
  id: string;
  name: string;
  stations: {id: string, name: string}[]
}

const mtrStations: MTRStation[] = ["AEL Airport Express HOK Hong Kong KOW Kowloon TSY Tsing Yi AIR Airport AWE AsiaWorld Expo",
"TCL Tung Chung Line HOK Hong Kong KOW Kowloon OLY Olympic NAC Nam Cheong LAK Lai King TSY Tsing Yi SUN Sunny Bay TUC Tung Chung",
"TML Tuen Ma Line WKS Wu Kai Sha MOS Ma On Shan HEO Heng On TSH Tai Shui Hang SHM Shek Mun CIO City One STW Sha Tin Wai CKT Che Kung Temple TAW Tai Wai HIK Hin Keng DIH Diamond Hill KAT Kai Tak SUW Sung Wong Toi TKW To Kwa Wan HOM Ho Man Tin HUH Hung Hom ETS East Tsim Sha Tsui AUS Austin NAC Nam Cheong MEF Mei Foo TWW Tsuen Wan West KSR Kam Sheung Road YUL Yuen Long LOP Long Ping TIS Tin Shui Wai SIH Siu Hong TUM Tuen Mun",
"TKL Tseung Kwan O Line NOP North Point QUB Quarry Bay YAT Yau Tong TIK Tiu Keng Leng TKO Tseung Kwan O LHP LOHAS Park HAH Hang Hau POA Po Lam",
"EAL East Rail Line ADM Admiralty EXC Exhibition Centre HUH Hung Hom MKK Mong Kok East KOT Kowloon Tong TAW Tai Wai SHT Sha Tin FOT Fo Tan RAC Racecourse UNI University TAP Tai Po Market TWO Tai Wo FAN Fanling SHS Sheung Shui LOW Lo Wu LMC Lok Ma Chau"]
.map((i: string)=>{
    var tmp: any = {id: "", name: "", stations: []}
    var split = i.split(/ ([A-Z]{3}) /)
    var tmpStation: any = {}
    for (let index = 0; index < split.length; index++) {
      const element = split[index];
      console.log(element)
      if (index === 0) {
        tmp.id = element.substring(0, 3)
        tmp.name = element.substring(4, element.length)
      } else if (index % 2 === 1) { // station id
        tmpStation.id = element
      } else { // station name
        tmpStation.name = element
        tmp.stations = [...tmp.stations, tmpStation]
        tmpStation = {}
      }
    }

    return tmp
  });

export const getMTRStations = () => mtrStations;
export const getMTRLine = (line: string) => mtrStations.find((s) => s.id === line);
export const getMTRStation = (line: string, id: string) =>
  mtrStations.find((s) => s.id === line)?.stations.find((s) => s.id === id);
