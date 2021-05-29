import pandas as pd
import numpy as np

###################################################################################################################
def monthChange (year, month, df): # month input as a number
    """ for an input year, month, and df with daily data calculate the percent change in the ticker """
    try:
        df = df[(df.year==year) & (df.month==month)]
        monthStart = df.iloc[0]['Adj Close']
        monthEnd = df.iloc[len(df)-1]['Adj Close']
        change = 100*(monthEnd - monthStart)/monthStart
        return month, year,change
    except Exception as ex:
        print("!!!!!!!!!!!! error in monthChange function ",ex)
        return 0,0,0    
####################################################################################################################    
###################################################################################################################
def qtrChange (year, qtr, df): # month input as a number
    """ for an input year, quarter, and df with daily data calculate the percent change in the ticker """
    try:
        df = df[(df.year==year) & (df.quarter==qtr)]
        qtrStart = df.iloc[0]['Adj Close']
        qtrEnd = df.iloc[len(df)-1]['Adj Close']
        change = 100*(qtrEnd - qtrStart)/qtrStart
        return qtr, year,change
    except Exception as ex:
        print("!!!!!!!!!!!! error in monthChange function ",ex)
        return 0,0,0    
####################################################################################################################
###################################################################################################################
def presidentChange (president, df): # month input as a number
    """ for an input president and df with daily data calculate the percent change in the ticker """
    try:
        df = df[df.President==president]
        presidentStart = df.iloc[0]['Adj Close']
        presidentEnd = df.iloc[len(df)-1]['Adj Close']
        change = 100*(presidentEnd - presidentStart)/presidentStart
        return president,change
    except Exception as ex:
        print("!!!!!!!!!!!! error in monthChange function ",ex)
        return 0,0
####################################################################################################################
 ###################################################################################################################
def partyChange (president, df): # month input as a number
    """ for an input president and df with daily data calculate the percent change in the ticker """
    try:
        df = df[df.President==president]
        presidentStart = df.iloc[0]['Adj Close']
        presidentEnd = df.iloc[len(df)-1]['Adj Close']
        change = 100*(presidentEnd - presidentStart)/presidentStart
        party=df.iloc[0].Party
        return president,party,change
    except Exception as ex:
        print("!!!!!!!!!!!! error in monthChange function ",ex)
        return 0,0,0
####################################################################################################################

quarters={
    1:1,
    2:1,
    3:1,
    4:2,
    5:2,
    6:2,
    7:3,
    8:3,
    9:3,
    10:4,
    11:4,
    12:4
}

mths = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
}
df=pd.read_csv('spx.csv') # read in data
df.Date=df.Date.apply(lambda x: pd.to_datetime(x)) # convert to datetime
df['year']=df.Date.dt.year # add column with a year
df['month']=df.Date.dt.month # add a column with month as a number
df['quarter']=df.month.apply(lambda x: quarters[x])
df = df[df.year>1927] # only have data for December, 1927 on
df_presidents = pd.read_csv('presidents.csv')
df=pd.merge(df,df_presidents,how='left',left_on='year',right_on='Year')

# by month
results_month = [monthChange(y,m,df) for y in df.year.unique() for m in df.month.unique()]
df_results_month=pd.DataFrame(results_month,columns=(['month','year','change']))
df_results=df_results_month[(df_results_month.month != 0) & (df_results_month.year !=0)]
print('by month')
print(df_results.head())
print(df_results.groupby('month').change.mean())
print(df_results.groupby('month').change.max()) 
print(df_results.groupby('month').change.min())    
df_results.groupby('month').change.mean().to_csv('monthly.csv')
df_results.groupby('month').change.mean().to_json('monthly.json')
df_results.groupby('month').change.agg(np.std).to_json('monthly_stdev.json')
df_results.groupby('month').change.min().to_json('monthly_min.json')
df_results.groupby('month').change.max().to_json('monthly_max.json')
# by quarter
results_qtr = [qtrChange(y,q,df) for y in df.year.unique() for q in df.quarter.unique()]
df_results_qtr=pd.DataFrame(results_qtr,columns=(['quarter','year','change']))
df_results_qtr=df_results_qtr[(df_results_qtr.quarter != 0) & (df_results_qtr.year !=0)]
print('by qtr')
print(df_results_qtr.head())
print(df_results_qtr.groupby('quarter').change.mean())
df_results_qtr.groupby('quarter').change.mean().to_json('quarter.json')


# do by president
results_president = [presidentChange(p,df) for p in df.President.unique()]
df_results_president=pd.DataFrame(results_president,columns=(['president','change']))
df_results_president=df_results_president[df_results_president.president != 0]
df_results_president=df_results_president.sort_values(by='change', ascending=False)
df_results_president=df_results_president.set_index('president')
df_results_president.to_json('max_pres.json')
print('by president')
print(df_results_president.head())

# do by party
results_party = [partyChange(p,df) for p in df.President.unique()]
df_results_party=pd.DataFrame(results_party,columns=(['president','party','change']))
df_results_party=df_results_party[df_results_party.party != 0]
print('by party')
print(df_results_party.head())
print(df_results_party.groupby('party').change.mean())
df_results_party.groupby('party').change.mean().to_json('party.json')
