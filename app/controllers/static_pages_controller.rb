class StaticPagesController < ApplicationController
  before_action :require_signed_in!, only: [:root]
  
  def root
    @poem = generateWisdom
  end

  def generateWisdom
    start = ["Never forget to", "To be human is to", "In the end we all need to", "Above all you will", "Some souls will", "Remember to", "You deserve to", "We were born to", "Starting today", "The truth is everyone will", "Mistakes are how you learn to", "Success is learning to", "Take time every day to", "Life is about remembering to"]
    verb = %w(breath live watch achieve ache accept annunciate befriend blush concede encode foretell imagine imply inspire observe permit ponder postulate rave rhyme snack uphold wander worship work weep view triumph travel thrive terrify tend taste survive suffer subscribe stride steep sneeze snap slink shout shiver select scrawl sacrifice review pretend proceed preach)
    noun = %w(understanding wisdom strength courage love silence happiness warmth freedom absurdness artfulness bitterness candidness conciseness sophistication backbone Brilliance Brutality Charity Coldness Compassion Confidence Contentment Courage Curiosity Dedication Determination Elegance Enthusiasm Envy Fear  Generosity Goodness Graciousness Hatred Honesty Honor Hope Humility Humor Insanity Integrity Intelligence Jealousy Kindness Loyalty Maturity Patience Perseverance Sanity Self-control Sensitivity Sophistication Stupidity Sympathy Talent Tolerance Trust Warmth Weakness Wisdom Wit)
    "#{start[rand(start.length)]} #{verb[rand(verb.length)]} with #{noun[rand(noun.length)].downcase}."
  end
end
