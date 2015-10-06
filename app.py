from flask import Flask, render_template, request, redirect, url_for, json, flash
import requests

app = Flask(__name__)
app.secret_key = 'some_key'

# This will identify the address of the webpage that
# requested the feedback form. By checking the referrer,
# we can see from where the request originated.
# def feedback_referrer():
# ref = unicode(request.referrer)
# return ref

feedback_ref = "http://virtual-labs.ac.in/labs/cse18/"
# feedback_ref = None


@app.route('/feedback', methods=['GET', 'POST'])
def feedback_form():
    if request.method == 'GET':
        if feedback_ref is not None:
#            response = requests.get('http://10.2.58.25:5000/labs/1')
#            lab = response.json()
#            return render_template('feedback.html',
#                                   lab_name=lab['name'],
#                                   lab_id=lab['id'])
            response = requests.get('http://10.2.58.25:5000/experiments/663')
            experiment = response.json()
            return render_template('feedback.html',
                                   lab_name=experiment['lab']['name'],
                                   lab_id=experiment['lab']['id'],
                                   expt_name=experiment['name'],
                                   expt_id=experiment['id'])

        else:
            response = requests.get('http://10.2.58.25:5000/labs')
            return render_template('feedback.html',
                                   labs_list=response.json())

    if request.method == 'POST':
        feedback_data = request.form.to_dict()
        feedback_data['lab'] = {'id': request.form.get('lab')}
        if not feedback_data['user_email']:
            feedback_data.pop('user_email')

        if request.form.get('experiment'):
            feedback_data['experiment'] = {'id':
                                           request.form.get('experiment')}
        else:
            feedback_data.pop('experiment')

        feedback_data['ip'] = request.remote_addr
        print json.dumps(feedback_data)
        response = requests.post('http://10.2.58.25:5000/feedback',
                                 data=json.dumps(feedback_data))
        if response.status_code == 200:
            return redirect(url_for('thanks'))
        else:
            flash('Error posting your feedback')
            return redirect(url_for('feedback_form'))


@app.route('/thanks')
def thanks():
    return render_template('thanks.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
