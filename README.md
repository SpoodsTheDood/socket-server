ws://172.17.103.101:3000

to server:
'click' with nothing
'resetClicks' with nothing

listen from server:
'someoneClicked' -> totalClicks, whoClicked
'someoneResetClicks' -> totalClicks, whoClicked
'connectComplete' -> totalClicks