// Australian Historical Events Data
export const events = [
  { year: 1956, description: 'Australia hosts its first Olympics. Coinciding with televisions national release.', title: 'Melbourne hosts the Olympic Games.', trackId: '46dHcg4e6XNhpYIHHDeC9f' },
  { year: 1962, description: 'Parliament passes an act, allowing First Nations people to enroll and vote in federal elections.', title: 'Indigenous Australians granted the right to vote.', trackId: '7ouMYWpwJ422jRcDASZB7P' },
  { year: 1966, description: 'Australia begins transition from pounds to dollars.', title: 'Decimal currency is introduced.', trackId: '2PneNdtypG6XcgmWmGd9FI' },
  { year: 1967, description: '90% of Australians vote to include Indigenous Australians in the census.', title: 'Referendum on Indigenous Australians rights.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1974, description: 'Destroying 80% of the city and killing 66 people.', title: 'Cyclone Tracy hit Darwin on Christmas Day.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1975, description: 'First and only Governor-General dismissal of Government.', title: 'Prime Minister Gough Whitlam is dismissed.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1984, description: 'Establishes national basic healthcare for Australians.', title: 'Medicare is introduced in Australia.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1985, description: 'Australian Government hands land titles to Anangu people.', title: 'Uluru Handback.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1996, description: 'Kicking off the creation of stable Wi-Fi.', title: 'CSIRO develops FFT computer chip.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1996, description: 'Killing 35 people, it started major gun reforms in the nation.', title: 'Port Arthur Massacre Occurs.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 1999, description: 'Australia votes NO to a republic. Retaining the monarchy.', title: 'Australia votes NO to a republic.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2000, description: 'Lighting the Olympic flame, promoting reconciliation across the nation.', title: 'Kathy Freeman wins gold in the 400m sprint.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2008, description: 'Formal apology to Indigenous Australians regarding the Stolen Generations.', title: 'Apology to the Stolen Generations.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2009, description: 'Bushfires in Victoria Kill 173 people.', title: 'Black Saturday.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2010, description: 'Julia Gillard is sworn in by Australias first governor-general.', title: 'Australias first female prime minister.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2013, description: 'Australias national disability scheme.', title: 'NDIS is introduced.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2017, description: 'Redefining the Marriage Act to give rights to same-sex couples.', title: 'Same sex marriage is legalised in Australia.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2019, description: 'Burning 19 hectares and over 3,000 homes.', title: 'Black Summer bushfires.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2020, description: 'The first case of COVID-19 was reported in Australia.', title: 'COVID-19 hits Australia.', trackId: '0eGsygTp906u18L0Oimnem' },
  { year: 2023, description: 'Australia votes NO to providing a permanent voice for Indigenous Australians.', title: 'Voice to Parliament referendum.', trackId: '0eGsygTp906u18L0Oimnem' }
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