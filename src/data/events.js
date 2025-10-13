// Australian Historical Events Data
export const events = [
  { year: 1956, description: 'Australia hosts its first Olympics. Coinciding with televisions national release.', title: 'Melbourne hosts the Olympic Games.', imageUrl: '/images/TvOlympic.jpg', imageAlt: 'Melbourne Olympic Games', caption:'Source: NMA, 2018', trackId: '46dHcg4e6XNhpYIHHDeC9f' },
  { year: 1962, description: 'Parliament passes an act, allowing First Nations people to enroll and vote in federal elections.', title: 'Indigenous Australians granted the right to vote.', imageUrl: '/images/IndigenousVote.jpg', imageAlt: 'Indigenous Vote', caption:'Source: NMA, 2018', trackId: '7ouMYWpwJ422jRcDASZB7P' },
  { year: 1966, description: 'Australia begins transition from pounds to dollars.', title: 'Decimal currency is introduced.', imageUrl: '/images/DecimalCurrency.jpg', imageAlt: 'Decimal Currency', caption:'Source: NMA, 2018', trackId: '2PneNdtypG6XcgmWmGd9FI' },
  { year: 1967, description: '90% of Australians vote to include Indigenous Australians in the census.', title: 'Referendum on Indigenous Australians rights.', imageUrl: '/images/IndigenousReferendum.jpg', imageAlt: 'Indigenous Referendum', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1974, description: 'Destroying 80% of the city and killing 66 people.', title: 'Cyclone Tracy hit Darwin on Christmas Day.', imageUrl: '/images/CycloneTracy.jpg', imageAlt: 'Cyclone Tracy', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1975, description: 'First and only Governor-General dismissal of Government.', title: 'Prime Minister Gough Whitlam is dismissed.', imageUrl: '/images/WhitlamDismissal.jpg', imageAlt: 'Whitlam Dismissal', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1984, description: 'Establishes national basic healthcare for Australians.', title: 'Medicare is introduced in Australia.', imageUrl: '/images/Medicare.jpg', imageAlt: 'Medicare', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1985, description: 'Australian Government hands land titles to Anangu people.', title: 'Uluru Handback.', imageUrl: '/images/HandbackUluru.jpg', imageAlt: 'Uluru Handback', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1996, description: 'Kicking off the creation of stable Wi-Fi.', title: 'CSIRO develops FFT computer chip.', imageUrl: '/images/WifiCSIRO.jpg', imageAlt: 'FFT Computer Chip', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1996, description: 'Killing 35 people, it started major gun reforms in the nation.', title: 'Port Arthur Massacre Occurs.', imageUrl: '/images/PortArthur.jpg', imageAlt: 'Porth Arthur', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1999, description: 'Australia votes NO to a republic. Retaining the monarchy.', title: 'Australia votes NO to a republic.', imageUrl: '/images/RepublicReferendum.jpg', imageAlt: 'Referendum for a Republic', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2000, description: 'Lighting the Olympic flame, promoting reconciliation across the nation.', title: 'Kathy Freeman wins gold in the 400m sprint.', imageUrl: '/images/CathyFreeman.jpg', imageAlt: 'Kathy Freeman', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2008, description: 'Formal apology to Indigenous Australians regarding the Stolen Generations.', title: 'Apology to the Stolen Generations.', imageUrl: '/images/NationalApology.jpg', imageAlt: 'National Apology', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2009, description: 'Bushfires in Victoria Kill 173 people.', title: 'Black Saturday.', imageUrl: '/images/BlackSaturday.jpg', imageAlt: 'Black Saturday', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2010, description: 'Julia Gillard is sworn in by Australias first governor-general.', title: 'Australias first female prime minister.', imageUrl: '/images/JuliaGillard.jpg', imageAlt: 'Julia Gillard', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2013, description: 'Australias national disability scheme.', title: 'NDIS is introduced.', imageUrl: '/images/NDIS.jpg', imageAlt: 'NDIS Protests', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2017, description: 'Redefining the Marriage Act to give rights to same-sex couples.', title: 'Same sex marriage is legalised in Australia.', imageAlt: 'Same Sex Marriage', imageUrl: '/images/SameSexMarriage.jpg', caption:'Source: NMA, 2018', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2019, description: 'Burning 19 hectares and over 3,000 homes.', title: 'Black Summer bushfires.', imageUrl: '/images/2020Bushfires.jpg', imageAlt: 'Black Summer Bushfires', caption:'Source: 7News, 2020', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2020, description: 'The first case of COVID-19 was reported in Australia.', title: 'COVID-19 hits Australia.', imageUrl: '/images/COVID19.jpg', imageAlt: 'COVID-19', caption:'Source: UniMelb, 2022', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2023, description: 'Australia votes NO to providing a permanent voice for Indigenous Australians.', title: 'Voice to Parliament referendum.', imageUrl: '/images/VoiceToParliment.jpg', imageAlt: 'Voice to Parliament', caption:'Source: Alamy, 2023', trackId: '0eGsygTp906u18L0Oimnem' }
]

// Helper function to get event by index
export const getEventByIndex = (index) => {
  return events[index] || null
}

// Helper function to get event by year
export const getEventByYear = (year) => {
  return events.find(event => event.year === year) || null
}

// Helper function to get event by track ID
export const getEventByTrackId = (trackId) => {
  return events.find(event => event.trackId === trackId) || null
}